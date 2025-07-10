import React from 'react';
import { Box } from '@mui/material';

// Componentes da landing
import Topbar from '../layouts/Topbar';
import Hero from '../components/landing/Hero';
import Showcase from '../components/landing/Showcase';
import WhyEvolux from '../components/landing/WhyEvolux';
import Benefits from '../components/landing/Benefits';
import CTASection from '../components/landing/CTASection';
import FAQ from '../components/landing/FAQ';
import Footer from '../components/landing/Footer';

export default function Landing() {
  return (
    <Box>
      <Topbar />
      <Box sx={{ pt: 8 }}> {/* Padding top for normal topbar height */}
        <Hero />
        <Showcase />
        <WhyEvolux />
        <Benefits />
        <CTASection />
        <FAQ />
        <Footer />
      </Box>
    </Box>
  );
}