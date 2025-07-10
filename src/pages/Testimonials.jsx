import React from 'react';
import { Box } from '@mui/material';
import Topbar from '../layouts/Topbar';
import TestimonialsSection from '../components/landing/Testimonials';
import Footer from '../components/landing/Footer';

export default function Testimonials() {
  return (
    <Box>
      <Topbar />
      <Box sx={{ pt: 8 }}> {/* Padding top for normal topbar height */}
        <TestimonialsSection />
        <Footer />
      </Box>
    </Box>
  );
}