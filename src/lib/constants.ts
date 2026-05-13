export const SITE = {
  name: 'Codevertex IT Solutions',
  tagline: "Architecting Africa's Digital Renaissance",
  url: 'https://codevertexitsolutions.com',
  email: 'info@codevertexitsolutions.com',
  phone1: '+254 743 793 901',
  phone2: '+254 792 548 766',
  whatsapp: 'https://wa.me/254743793901',
  address: 'Pioneer House, 2nd Floor, Oginga Street, Kisumu, Kenya',
  socials: {
    linkedin: 'https://linkedin.com/company/codevertex-it-solutions',
    twitter: 'https://twitter.com/codevertexke',
  },
};

export const TREASURY = {
  payUrl: 'https://books.codevertexitsolutions.com/pay',
  tenant: process.env.NEXT_PUBLIC_TREASURY_TENANT ?? 'codevertex',
};

export const SSO_URL = 'https://accounts.codevertexitsolutions.com';

export const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Digitika', href: '/digitika' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const;
