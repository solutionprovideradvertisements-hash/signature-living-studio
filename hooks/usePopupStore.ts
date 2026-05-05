import { create } from 'zustand';

interface PopupState {
  isOpen: boolean;
  source: string;
  openPopup: (source?: string) => void;
  closePopup: () => void;
}

export const usePopupStore = create<PopupState>((set) => ({
  isOpen: false,
  source: 'direct',
  openPopup: (source = 'direct') => {
    // Check if already submitted in this session
    if (typeof window !== 'undefined') {
      const submitted = sessionStorage.getItem('sls_modal_submitted');
      if (submitted === 'true') {
        return;
      }
    }
    set({ isOpen: true, source });
  },
  closePopup: () => set({ isOpen: false }),
}));
