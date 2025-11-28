export interface Newspaper {
  name: string;
  url: string;
  region?: string;
  category: 'bangla' | 'intl' | 'arab' | 'islamic';
}

export interface TVChannel {
  name: string;
  url: string;
  iconClass: string;
  colorClass: string;
}

export interface Quote {
  text: string;
}

export interface AIModel {
  name: string;
  url: string;
  icon: string;
  color: string;
}