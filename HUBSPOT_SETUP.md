# HubSpot Forms Integration Setup

This guide explains how to connect your Veda Life Spaces forms to HubSpot.

## Overview

All forms on the website now submit to HubSpot via the HubSpot Forms API, with the existing PHP API as a backup.

### Forms Integrated:
1. **EnquiryForm** - Inline enquiry form
2. **DarkEnquirySection** - Homepage dark enquiry section
3. **Contact** - Contact us page form

## Setup Instructions

### 1. Get Your HubSpot Portal ID

1. Log in to your HubSpot account
2. Click the settings icon (⚙️) in the top right
3. Go to **Account & Billing** → **Account Setup**
4. Your **Hub ID** (Portal ID) is displayed at the top
5. Copy this number (e.g., `12345678`)

### 2. Create Forms in HubSpot

For each form, you need to create a corresponding form in HubSpot:

1. In HubSpot, go to **Marketing** → **Lead Capture** → **Forms**
2. Click **Create form** → Choose **Embedded form**
3. Add these fields to match your website forms:

   **Required Fields:**
   - First Name (Internal name: `firstname`)
   - Last Name (Internal name: `lastname`)
   - Email (Internal name: `email`)
   - Phone Number (Internal name: `phone`)
   
   **Optional Fields:**
   - Message (Internal name: `message`) - for Contact form
   
   **Custom Properties:**
   - Consent to Contact (Internal name: `consent_to_contact`) - Single checkbox
   - Lead Source (Internal name: `lead_source`) - Single-line text

4. Configure form settings:
   - Set a thank you message or redirect
   - Configure notifications
   - Set up follow-up emails

5. **Save** the form and copy the **Form GUID** from the embed code
   - The GUID looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

### 3. Configure Environment Variables

Open the `.env.local` file in the root of your project and replace the placeholder values:

```bash
# HubSpot Configuration
VITE_HUBSPOT_PORTAL_ID=your-actual-portal-id
VITE_HUBSPOT_ENQUIRY_FORM_ID=guid-for-enquiry-form
VITE_HUBSPOT_CONTACT_FORM_ID=guid-for-contact-form
VITE_HUBSPOT_DARK_ENQUIRY_FORM_ID=guid-for-dark-enquiry-form
```

**Example:**
```bash
VITE_HUBSPOT_PORTAL_ID=12345678
VITE_HUBSPOT_ENQUIRY_FORM_ID=a1b2c3d4-e5f6-7890-abcd-ef1234567890
VITE_HUBSPOT_CONTACT_FORM_ID=b2c3d4e5-f6g7-8901-bcde-fg2345678901
VITE_HUBSPOT_DARK_ENQUIRY_FORM_ID=c3d4e5f6-g7h8-9012-cdef-gh3456789012
```

### 4. Restart Development Server

After updating the `.env.local` file:

```bash
npm run dev
```

## Field Mapping

The forms map to HubSpot fields as follows:

| Website Field | HubSpot Field | Internal Name |
|--------------|---------------|---------------|
| First Name | First Name | `firstname` |
| Last Name | Last Name | `lastname` |
| Email | Email | `email` |
| Phone Number | Phone Number | `phone` |
| Message | Message | `message` |
| Checkbox (consent) | Consent to Contact | `consent_to_contact` |
| Form Source | Lead Source | `lead_source` |

## Testing

1. Fill out a form on your website
2. Check the browser console for any errors
3. Verify the submission in HubSpot:
   - Go to **Contacts** → **Contacts**
   - Find the newly created contact
   - Check the **Activity** tab to see the form submission

## Troubleshooting

### Forms not submitting to HubSpot

1. **Check environment variables:**
   ```bash
   # Run in development console
   console.log(import.meta.env.VITE_HUBSPOT_PORTAL_ID)
   ```
   - If it shows `undefined`, your `.env.local` file isn't loaded
   - Make sure the file is in the root directory
   - Restart your dev server

2. **Check HubSpot Form GUIDs:**
   - Verify the GUIDs are correct
   - They should be 36 characters with dashes
   - Copy them directly from HubSpot's embed code

3. **Check browser console:**
   - Open Developer Tools (F12)
   - Look for network errors or CORS issues
   - HubSpot API endpoint: `https://api.hsforms.com/submissions/v3/integration/submit/...`

4. **Verify HubSpot form fields:**
   - Make sure all internal field names match
   - Required fields in HubSpot must be provided
   - Custom properties must be created in HubSpot first

### CORS Issues

The HubSpot Forms API allows cross-origin requests, but if you encounter issues:
- Verify your domain is allowlisted in HubSpot form settings
- Check that the form is published and active

### Custom Properties Not Showing

If `consent_to_contact` or `lead_source` aren't appearing:

1. Go to **Settings** → **Properties**
2. Search for the property
3. If it doesn't exist, create it:
   - Object type: **Contact**
   - Field type: **Single checkbox** (for consent) or **Single-line text** (for source)
   - Internal name: exactly `consent_to_contact` or `lead_source`

## Additional Features

### Automatic Lead Source Tracking

Each form automatically sets a lead source:
- `Enquiry Inline`
- `Homepage Dark Enquiry`
- `Contact Us Form`

You can use this in HubSpot workflows to trigger different automations based on where the lead came from.

### Backup PHP API

All forms continue to submit to your existing PHP API (`/api/createLead.php`) as a backup. If HubSpot fails, the PHP API ensures you don't lose leads.

## Support

For HubSpot-specific issues, refer to:
- [HubSpot Forms API Documentation](https://developers.hubspot.com/docs/api/marketing/forms)
- [HubSpot API Status](https://status.hubspot.com/)
