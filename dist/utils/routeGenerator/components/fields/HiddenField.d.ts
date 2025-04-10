/**
 * Hidden Field Generator
 * Generates HTML/JSX for hidden input form fields
 */
import { Attribute } from '../../../../interfaces/types';
/**
 * Generates a hidden input field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default field value
 * @returns {string} Generated hidden field JSX
 */
export declare function generateHiddenField(attr: Attribute, fieldName: string, defaultValue: string): string;
