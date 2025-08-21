import { create } from 'zustand';
import { SiteBuilderState, SiteBuilderActions } from '@/types/site-builder';

const initialState: SiteBuilderState = {
  currentStep: 1,
  clientId: null,
  basicInfo: null,
  selectedSections: [],
  isLoading: false,
  error: null,
};

export const useSiteBuilder = create<SiteBuilderState & SiteBuilderActions>((set) => ({
  ...initialState,

  setCurrentStep: (step) => set({ currentStep: step }),
  
  setClientId: (id) => set({ clientId: id }),
  
  setBasicInfo: (info) => set({ basicInfo: info }),
  
  setSelectedSections: (sections) => set({ selectedSections: sections }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  reset: () => set(initialState),
}));
