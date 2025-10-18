import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/api_sentiments/')
      .then(res => {
        setArticles(res.data.data || res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const getSentimentColor = (sentiment) => {
    switch(sentiment.toLowerCase()) {
      case 'positive':
        return { bg: '#d4edda', border: '#28a745', text: '#155724' };
      case 'negative':
        return { bg: '#f8d7da', border: '#dc3545', text: '#721c24' };
      case 'neutral':
        return { bg: '#e2e3e5', border: '#6c757d', text: '#383d41' };
      default:
        return { bg: '#e2e3e5', border: '#6c757d', text: '#383d41' };
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch(sentiment.toLowerCase()) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😔';
      case 'neutral':
        return '😐';
      default:
        return '😐';
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          fontSize: '24px',
          color: '#6c757d'
        }}>
          Loading articles...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <header style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            color: '#2c3e50',
            marginBottom: '10px',
            fontWeight: 'bold'
          }}>
            📰 News Sentiment Analysis
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#6c757d',
            marginBottom: '20px'
          }}>
            Latest news articles analyzed for emotional sentiment
          </p>
          <div style={{
            display: 'inline-block',
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '25px',
            fontSize: '1rem'
          }}>
            Total Articles: {articles.length}
          </div>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px',
          padding: '0 10px'
        }}>
          {articles.map((article, index) => {
            const colors = getSentimentColor(article.sentiment);
            return (
              <div
                key={index}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '25px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e9ecef',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '15px'
                }}>
                  <span style={{
                    fontSize: '14px',
                    color: '#6c757d',
                    fontWeight: '500'
                  }}>
                    Article #{index + 1}
                  </span>
                  <div style={{
                    backgroundColor: colors.bg,
                    color: colors.text,
                    border: `2px solid ${colors.border}`,
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <span>{getSentimentIcon(article.sentiment)}</span>
                    {article.sentiment.toUpperCase()}
                  </div>
                </div>
                
                <h3 style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.4',
                  color: '#2c3e50',
                  margin: '0',
                  fontWeight: '600'
                }}>
                  {article.title}
                </h3>
              </div>
            );
          })}
        </div>

        {articles.length === 0 && !loading && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#6c757d'
          }}>
            <h3>No articles found</h3>
            <p>Try refreshing the page or check your API connection.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
