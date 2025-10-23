"use client";

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    svgMap: any;
  }
}

const countryData = {
    values: {
      AF: { name: 'Afghanistan' }, AL: { name: 'Albania' }, DZ: { name: 'Algeria' }, AO: { name: 'Angola' },
      AR: { name: 'Argentina' }, AM: { name: 'Armenia' }, AU: { name: 'Australia' }, AT: { name: 'Austria' },
      AZ: { name: 'Azerbaijan' }, BS: { name: 'Bahamas' }, BD: { name: 'Bangladesh' }, BY: { name: 'Belarus' },
      BE: { name: 'Belgium' }, BZ: { name: 'Belize' }, BJ: { name: 'Benin' }, BT: { name: 'Bhutan' },
      BO: { name: 'Bolivia' }, BA: { name: 'Bosnia and Herzegovina' }, BW: { name: 'Botswana' }, BR: { name: 'Brazil' },
      BN: { name: 'Brunei' }, BG: { name: 'Bulgaria' }, BF: { name: 'Burkina Faso' }, BI: { name: 'Burundi' },
      KH: { name: 'Cambodia' }, CM: { name: 'Cameroon' }, CA: { name: 'Canada' }, CF: { name: 'Central African Republic' },
      TD: { name: 'Chad' }, CL: { name: 'Chile' }, CN: { name: 'China' }, CI: { name: 'Ivory Coast' },
      CO: { name: 'Colombia' }, CG: { name: 'Congo' }, CD: { name: 'DR Congo' }, CR: { name: 'Costa Rica' },
      HR: { name: 'Croatia' }, CU: { name: 'Cuba' }, CY: { name: 'Cyprus' }, CZ: { name: 'Czech Republic' },
      DK: { name: 'Denmark' }, DJ: { name: 'Djibouti' }, DO: { name: 'Dominican Republic' }, EC: { name: 'Ecuador' },
      EG: { name: 'Egypt' }, SV: { name: 'El Salvador' }, GQ: { name: 'Equatorial Guinea' }, ER: { name: 'Eritrea' },
      EE: { name: 'Estonia' }, ET: { name: 'Ethiopia' }, FJ: { name: 'Fiji' }, FI: { name: 'Finland' },
      FR: { name: 'France' }, GA: { name: 'Gabon' }, GB: { name: 'United Kingdom' }, GE: { name: 'Georgia' },
      GH: { name: 'Ghana' }, GN: { name: 'Guinea' }, GM: { name: 'Gambia' }, GW: { name: 'Guinea-Bissau' },
      GR: { name: 'Greece' }, GL: { name: 'Greenland' }, GT: { name: 'Guatemala' }, GY: { name: 'Guyana' },
      HN: { name: 'Honduras' }, HT: { name: 'Haiti' }, HU: { name: 'Hungary' }, IS: { name: 'Iceland' },
      IN: { name: 'India' }, ID: { name: 'Indonesia' }, IR: { name: 'Iran' }, IQ: { name: 'Iraq' },
      IE: { name: 'Ireland' }, IL: { name: 'Israel' }, IT: { name: 'Italy' }, JM: { name: 'Jamaica' },
      JO: { name: 'Jordan' }, JP: { name: 'Japan' }, KZ: { name: 'Kazakhstan' }, KE: { name: 'Kenya' },
      KG: { name: 'Kyrgyzstan' }, KR: { name: 'South Korea' }, XK: { name: 'Kosovo' }, KW: { name: 'Kuwait' },
      LA: { name: 'Laos' }, LB: { name: 'Lebanon' }, LR: { name: 'Liberia' }, LY: { name: 'Libya' },
      LK: { name: 'Sri Lanka' }, LS: { name: 'Lesotho' }, LT: { name: 'Lithuania' }, LU: { name: 'Luxembourg' },
      LV: { name: 'Latvia' }, MA: { name: 'Morocco' }, MD: { name: 'Moldova' }, MG: { name: 'Madagascar' },
      MX: { name: 'Mexico' }, MK: { name: 'Macedonia' }, ML: { name: 'Mali' }, MT: { name: 'Malta' },
      MM: { name: 'Myanmar' }, ME: { name: 'Montenegro' }, MN: { name: 'Mongolia' }, MZ: { name: 'Mozambique' },
      MR: { name: 'Mauritania' }, MW: { name: 'Malawi' }, MY: { name: 'Malaysia' }, NA: { name: 'Namibia' },
      NC: { name: 'New Caledonia' }, NE: { name: 'Niger' }, NG: { name: 'Nigeria' }, NI: { name: 'Nicaragua' },
      NL: { name: 'Netherlands' }, NO: { name: 'Norway' }, NP: { name: 'Nepal' }, NZ: { name: 'New Zealand' },
      OM: { name: 'Oman' }, PK: { name: 'Pakistan' }, PA: { name: 'Panama' }, PE: { name: 'Peru' },
      PH: { name: 'Philippines' }, PG: { name: 'Papua New Guinea' }, PL: { name: 'Poland' }, PR: { name: 'Puerto Rico' },
      KP: { name: 'North Korea' }, PT: { name: 'Portugal' }, PY: { name: 'Paraguay' }, PS: { name: 'Palestine' },
      QA: { name: 'Qatar' }, RO: { name: 'Romania' }, RU: { name: 'Russia' }, RW: { name: 'Rwanda' },
      EH: { name: 'Western Sahara' }, SA: { name: 'Saudi Arabia' }, SD: { name: 'Sudan' }, SS: { name: 'South Sudan' },
      SN: { name: 'Senegal' }, SL: { name: 'Sierra Leone' }, SB: { name: 'Solomon Islands' }, SO: { name: 'Somalia' },
      RS: { name: 'Serbia' }, SR: { name: 'Suriname' }, SK: { name: 'Slovakia' }, SI: { name: 'Slovenia' },
      SE: { name: 'Sweden' }, SZ: { name: 'Swaziland' }, SY: { name: 'Syria' }, TW: { name: 'Taiwan' },
      TZ: { name: 'Tanzania' }, TH: { name: 'Thailand' }, TJ: { name: 'Tajikistan' }, TL: { name: 'Timor-Leste' },
      TG: { name: 'Togo' }, TT: { name: 'Trinidad and Tobago' }, TN: { name: 'Tunisia' }, TR: { name: 'Turkey' },
      TM: { name: 'Turkmenistan' }, UG: { name: 'Uganda' }, UA: { name: 'Ukraine' }, UY: { name: 'Uruguay' },
      US: { name: 'United States' }, UZ: { name: 'Uzbekistan' }, VE: { name: 'Venezuela' }, VN: { name: 'Vietnam' },
      VU: { name: 'Vanuatu' }, YE: { name: 'Yemen' }, ZA: { name: 'South Africa' }, ZM: { name: 'Zambia' },
      ZW: { name: 'Zimbabwe' },
    }
  };

export function GlobalNetworkMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    // Check if svgMap script has loaded and if the map hasn't been initialized yet
    if (typeof window.svgMap === 'function' && mapRef.current && !mapInstance.current) {
      mapInstance.current = new window.svgMap({
        targetElementID: 'svgMapContainer',
        colorMin: '#88A4BC',
        colorMax: '#3B729F',
        colorNoData: '#E2E2E2',
        hideFlag: true,
        mouseWheelZoomEnabled: false,
        onGetTooltip: function(tooltipDiv: HTMLElement, countryID: string, countryValues: any) {
            if (countryValues && countryValues.name) {
                // Return just the name for a simple tooltip
                return countryValues.name;
            }
            return '';
        },
        data: {
            data: {
                name: {
                    name: 'Country'
                }
            },
            applyData: 'name',
            values: countryData.values
        }
      });
    }

    // Cleanup function to destroy the map instance when the component unmounts
    return () => {
      if (mapInstance.current && mapInstance.current.destroy) {
        // The library doesn't have a destroy method, so we just clear the container
        if(mapRef.current) {
            (mapRef.current as HTMLElement).innerHTML = '';
        }
        mapInstance.current = null;
      }
    };
  }, []);

  return <div id="svgMapContainer" ref={mapRef} style={{ width: '100%', height: '500px' }} />;
}
