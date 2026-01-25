
export interface MaleVersion {
  name: string;
  price: string;
  description: string;
  details: string[];
  images: string[];
}

export interface ToggleOption {
  label: string;
  priceIncrement: number;
}

export interface Procedure {
  id: string;
  name: string;
  description: string;
  price: string;
  details?: string[];
  images: string[];
  comingSoon?: boolean;
  maleVersion?: MaleVersion;
  toggleOption?: ToggleOption;
}

export interface SubCategory {
  id: string;
  name: string;
  procedures: Procedure[];
}

export interface Category {
  id: string;
  name: string;
  procedures?: Procedure[];
  subCategories?: SubCategory[];
}

export interface BookingFormData {
  name: string;
  birthDate: string;
  preferredDays: string[];
  preferredTimes: string[];
  paymentMethod: 'pix' | 'credito' | 'debito' | '';
  observations: string;
}
