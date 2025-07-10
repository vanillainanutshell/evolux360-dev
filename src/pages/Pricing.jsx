import React from 'react';
import { Box } from '@mui/material';
import Topbar from '../layouts/Topbar';
import PricingPlansSection from '../components/landing/PricingPlans';
import Footer from '../components/landing/Footer';

export default function Pricing() {
  return (
    <Box>
      <Topbar />
      <Box sx={{ pt: 8 }}> {/* Padding top for normal topbar height */}
        <PricingPlansSection />
        <Footer />
      </Box>
    </Box>
  );
}