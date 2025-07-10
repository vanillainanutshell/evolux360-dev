import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5B2EFF',         // CTA buttons, icons, highlights
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4318FF',         // Deep purple for section background (CTA)
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8F6FF',      // Main page background
      paper: '#FFFFFF',        // Cards, modals
      card: '#E6E0FE',         // Light purple cards
      darkCard: '#2D0C8D',     // Dark purple cards
    },
    text: {
      primary: '#000000',      // Headlines
      secondary: '#555555',    // Subtitles, descriptions
      light: '#FFFFFF',        // White text
      lightSecondary: 'rgba(255,255,255,0.85)', // Semi-transparent white
      purple: '#5B2EFF',       // Purple text
    },
    grey: {
      100: '#F3F3F3',          // Card and light section background
      200: '#EDEDED',
      300: '#D9D9D9',
      400: '#CCCCCC',
      500: '#888888',          // Icons, placeholders
      600: '#666666',          // FAQ text
      900: '#1E1E1E',          // Footer background
    },
  },

  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',

    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 600,
      marginBottom: 16,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.5,
    },
    button: {
      fontSize: '0.9rem',
      fontWeight: 500,
      textTransform: 'none',
    },
  },

  shape: {
    borderRadius: 8,
  },

  spacing: 8, // Default unit for padding/margin

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          height: 64,
          backgroundColor: '#5B2EFF',
          boxShadow: 'none',
          borderRadius: 0,
        },
      },
      defaultProps: {
        position: 'fixed',
        elevation: 0
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 64,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingLeft: 20,
          paddingRight: 20,
          fontWeight: 500,
        },
        containedPrimary: {
          backgroundColor: '#5B2EFF',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#4318FF',
          }
        },
        outlinedPrimary: {
          color: 'white',
          borderColor: 'white',
          '&:hover': {
            borderColor: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }
        }
      },
      variants: [
        {
          props: { className: 'topbarButton' },
          style: {
            backgroundColor: 'white',
            color: '#5B2EFF',
            '&:hover': {
              backgroundColor: '#f5f5f5'
            }
          }
        },
        {
          props: { variant: 'contained', color: 'white' },
          style: {
            backgroundColor: '#FFFFFF',
            color: '#5B2EFF',
            '&:hover': {
              backgroundColor: '#F0F0F0',
            },
          }
        },
        {
          props: { variant: 'contained', className: 'ctaButton' },
          style: {
            backgroundColor: '#FFFFFF',
            color: '#5B2EFF',
            borderRadius: 8,
            fontWeight: 500,
            padding: '16px 32px',
            '&:hover': {
              backgroundColor: '#F0F0F0',
            },
          }
        }
      ]
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: 'none',
        },
      },
      variants: [
        {
          props: { variant: 'card' },
          style: {
            backgroundColor: '#E6E0FE',
            color: '#5B2EFF',
            padding: '32px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            borderRadius: '16px',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 20px rgba(91, 46, 255, 0.1)'
            }
          }
        },
        {
          props: { variant: 'darkCard' },
          style: {
            backgroundColor: '#2D0C8D',
            color: '#FFFFFF',
            padding: '32px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            borderRadius: '16px',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 20px rgba(45, 12, 141, 0.2)'
            }
          }
        }
      ]
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginBottom: 24,
          '&:before': { display: 'none' },
          boxShadow: 'none',
          backgroundColor: 'transparent',
          border: 'none'
        },
      },
      defaultProps: {
        disableGutters: true
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '16px 0',
          backgroundColor: 'transparent',
          borderBottom: 'none',
          '&.Mui-expanded': {
            minHeight: 48,
            backgroundColor: 'transparent',
            borderBottom: 'none'
          },
          '&:hover': {
            backgroundColor: 'transparent'
          },
          '& .MuiAccordionSummary-content': {
            borderBottom: 'none'
          },
          '& .MuiAccordionSummary-expandIcon': {
            color: '#5B2EFF',
            fontSize: 36
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '0 0 24px 0',
          backgroundColor: 'transparent',
          borderTop: 'none'
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          scrollMarginTop: '80px', // supports anchor scrolling with Navbar
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#5B2EFF',
          fontSize: '0.95rem',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#5B2EFF',
            },
            '&:hover fieldset': {
              borderColor: '#5B2EFF',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#5B2EFF',
            },
          },
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#5B2EFF',
        }
      }
    }
  },
});

export default theme;