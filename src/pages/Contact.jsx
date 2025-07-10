import React from 'react';
import { Box } from '@mui/material';
import Topbar from '../layouts/Topbar';
import ContactFormSection from '../components/landing/ContactForm';
import Footer from '../components/landing/Footer';

export default function Contact() {
  return (
    <Box>
      <Topbar />
      <Box sx={{ pt: 8 }}> {/* Padding top for normal topbar height */}
        <ContactFormSection />
        <Footer />
      </Box>
    </Box>
  );
}