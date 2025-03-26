/**
 * Table Form Utilities Module
 * Provides helper functions for handling entity configuration and API interactions
 */

import { Attribute, ConfigData, Entity } from '../interfaces/types';

// API endpoint from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;

/**
 * Converts an array to a comma-separated string
 * Used for displaying array values in table cells
 * 
 * @param {string[] | undefined} arr - Array to format
 * @returns {string} Comma-separated string
 */
export const formatArrayToString = (arr: string[] | undefined): string => {
  return arr ? arr.join(', ') : '';
};

/**
 * Default configuration for a new attribute
 * Provides sensible defaults for all attribute properties
 */
export const initialAttributeState: Attribute = {
  name: "",
  dataType: "",
  defaultValue: null,
  validations: { required: false },
  inputType: 'text',
  isEditable: true,
  sortable: true,
  isIndexed: false
};

/**
 * Fetches entity configuration from MongoDB JSON file
 * Contains input types, data types, and other configuration options
 * 
 * @returns {Promise<ConfigData>} Entity configuration data
 * @throws {Error} If fetch fails
 */
export async function fetchEntityConfig(): Promise<ConfigData> {
  try {
    const response = await fetch('/data/mongoEntityConfig.json');
    if (!response.ok) {
      throw new Error('Failed to fetch MongoDB config');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching MongoDB config:', error);
    throw new Error('Failed to fetch MongoDB configuration');
  }
}

/**
 * Saves entity configuration to backend API
 * 
 * @param {Entity} entity - Entity configuration to save
 * @param {string} token - Authentication token
 * @returns {Promise<{message: string, success: boolean}>} API response
 * @throws {Error} If API call fails
 */
export async function saveEntity(entity: Entity, token: string): Promise<{message: string, success: boolean}> {
  try {
    // Transform entity data for MongoDB
    const transformedEntity = {
      entityName: entity.entityName,
      attributes: entity.attributes.map(attr => ({
        attributeName: attr.name,
        inputType: attr.inputType,
        dataType: attr.dataType.toLowerCase(),
        defaultValue: attr.defaultValue || "",
        options: attr.options,
        isMultiSelect: attr.isMultiSelect,
        isEditable: attr.isEditable !== undefined ? attr.isEditable : true,
        sortable: attr.sortable !== undefined ? attr.sortable : true,
        validations: attr.validations,
        isReadOnly: attr.isReadOnly || false,
        displayInList: attr.displayInList !== false,
        isIndexed: attr.isIndexed || false,
        indexType: attr.indexType || null
      }))
    };

    // Send API request
    const response = await fetch(`${API_URL}/api/v1/entity/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(transformedEntity),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to save entity');
    }

    return {
      message: data.message || 'Entity saved successfully',
      success: true
    };
  } catch (error) {
    console.error('Error saving entity:', error);
    throw error;
  }
} 


