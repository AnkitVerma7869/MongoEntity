/**
 * Table Form Utilities Module
 * Provides helper functions for handling entity configuration and API interactions
 */
import { Attribute, ConfigData, Entity } from '../interfaces/types';
/**
 * Converts an array to a comma-separated string
 * Used for displaying array values in table cells
 *
 * @param {string[] | undefined} arr - Array to format
 * @returns {string} Comma-separated string
 */
export declare const formatArrayToString: (arr: string[] | undefined) => string;
/**
 * Default configuration for a new attribute
 * Provides sensible defaults for all attribute properties
 */
export declare const initialAttributeState: Attribute;
/**
 * Fetches entity configuration from MongoDB JSON file
 * Contains input types, data types, and other configuration options
 *
 * @returns {Promise<ConfigData>} Entity configuration data
 * @throws {Error} If fetch fails
 */
export declare function fetchEntityConfig(): Promise<ConfigData>;
/**
 * Saves entity configuration to backend API
 *
 * @param {Entity} entity - Entity configuration to save
 * @param {string} token - Authentication token
 * @returns {Promise<{message: string, success: boolean}>} API response
 * @throws {Error} If API call fails
 */
export declare function saveEntity(entity: Entity, token: string): Promise<{
    message: string;
    success: boolean;
}>;
