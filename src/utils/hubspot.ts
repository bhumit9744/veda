/**
 * HubSpot Forms API Integration
 * Submits form data to HubSpot via their Forms API
 */

interface HubSpotFormField {
  name: string;
  value: string;
}

interface HubSpotSubmissionData {
  portalId: string;
  formGuid: string;
  fields: HubSpotFormField[];
  context?: {
    pageUri: string;
    pageName: string;
  };
}

/**
 * Submit form data to HubSpot
 * @param formGuid - The HubSpot form GUID
 * @param fields - Object with field names and values
 * @returns Promise with submission result
 */
export async function submitToHubSpot(
  formGuid: string,
  fields: Record<string, string | boolean>
): Promise<{ success: boolean; message: string }> {
  const portalId = import.meta.env.VITE_HUBSPOT_PORTAL_ID;

  if (!portalId || !formGuid) {
    console.error('HubSpot configuration missing');
    return {
      success: false,
      message: 'Form configuration error. Please contact support.',
    };
  }

  // Convert fields object to HubSpot format
  const hubspotFields: HubSpotFormField[] = Object.entries(fields).map(([name, value]) => ({
    name,
    value: String(value),
  }));

  const submissionData: HubSpotSubmissionData = {
    portalId,
    formGuid,
    fields: hubspotFields,
    context: {
      pageUri: window.location.href,
      pageName: document.title,
    },
  };

  try {
    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      }
    );

    if (response.ok) {
      return {
        success: true,
        message: 'Form submitted successfully',
      };
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error('HubSpot submission failed:', errorData);
      return {
        success: false,
        message: 'Failed to submit form. Please try again.',
      };
    }
  } catch (error) {
    console.error('HubSpot submission error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
    };
  }
}

/**
 * Map form data to HubSpot field names
 * Adjust these mappings based on your HubSpot form field internal names
 */
export function mapFormDataToHubSpot(formData: {
  name?: string;
  lname?: string;
  email?: string;
  mobile?: string;
  message?: string;
  checkbox?: boolean;
  source?: string;
}): Record<string, string | boolean> {
  return {
    firstname: formData.name || '',
    lastname: formData.lname || '',
    email: formData.email || '',
    phone: formData.mobile || '',
    message: formData.message || '',
    // Add custom property for consent
    consent_to_contact: formData.checkbox || false,
    // Add lead source
    lead_source: formData.source || 'Website Form',
  };
}
