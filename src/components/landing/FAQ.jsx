import React, { memo } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const perguntas = [
  {
    pergunta: 'Posso integrar com marketplaces como Shopee ou Nuvemshop?',
    resposta: 'Sim! O Evolux360 já possui integração direta com Shopee, Nuvemshop, Mercado Livre e outras plataformas.',
  },
  {
    pergunta: 'É necessário cartão de crédito para o teste grátis?',
    resposta: 'Não. Você pode testar gratuitamente por 30 dias sem inserir cartão de crédito.',
  },
  {
    pergunta: 'Posso cancelar quando quiser?',
    resposta: 'Sim! Você pode cancelar sua conta a qualquer momento sem cobrança adicional.',
  },
  {
    pergunta: 'Quanto tempo leva para implementar o sistema?',
    resposta: 'A implementação básica é imediata. Você pode começar a usar no mesmo dia. Para integrações mais complexas, nossa equipe oferece suporte personalizado.',
  },
  {
    pergunta: 'O sistema funciona em dispositivos móveis?',
    resposta: 'Sim, o Evolux360 é totalmente responsivo e funciona em qualquer dispositivo com acesso à internet.',
  },
];

function FAQ() {
  return (
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h4"
            fontWeight={700}
            align="center"
            gutterBottom
            sx={{ fontSize: { xs: '1.8rem', sm: '2rem', md: '2rem' }, mb: 2 }}
          >
            Dúvidas Frequentes
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="grey.600"
            sx={{ fontSize: { xs: '1rem', md: '1.125rem' }, maxWidth: '700px', mx: 'auto' }}
          >
            Encontre respostas para as perguntas mais comuns sobre o Evolux360
          </Typography>
        </Box>

        <Box sx={{ mt: 4, width: '100%' }}>
          {perguntas.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{ 
                  minHeight: { xs: 'auto', md: 48 },
                  py: { xs: 1.5, md: 2 }
                }}
              >
                <Typography 
                  variant="subtitle1"
                  sx={{ 
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    lineHeight: 1.4,
                    pr: 2 // Espaço para o ícone não sobrepor o texto em telas pequenas
                  }}
                >
                  {item.pergunta}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography 
                  variant="body2" 
                  color="grey.600" 
                  sx={{ 
                    fontSize: { xs: '0.95rem', md: '1.1rem' },
                    lineHeight: 1.6
                  }}
                >
                  {item.resposta}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default memo(FAQ);