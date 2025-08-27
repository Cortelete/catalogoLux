
export interface MaleVersion {
  name: string;
  price: string;
  description: string;
  details: string[];
  images: string[];
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
  preferredDate: string;
  preferredTime: string;
  paymentMethod: 'pix' | 'credito' | 'debito' | '';
  observations: string;
}