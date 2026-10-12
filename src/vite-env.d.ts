/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HUBSPOT_PORTAL_ID: string;
  readonly VITE_HUBSPOT_ENQUIRY_FORM_ID: string;
  readonly VITE_HUBSPOT_CONTACT_FORM_ID: string;
  readonly VITE_HUBSPOT_DARK_ENQUIRY_FORM_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
