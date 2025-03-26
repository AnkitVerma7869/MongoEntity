/**
 * Helper Functions Module
 * Contains utility functions used across the application
 */
/**
 * Checks if a given SQL data type requires size validation
 * @param {string} dataType - The SQL data type to check
 * @returns {boolean} Whether the type needs size validation
 */
export declare const needsSizeValidation: (dataType: string) => boolean;
/**
 * Checks if a given SQL data type requires precision specification
 * @param {string} dataType - The SQL data type to check
 * @returns {boolean} Whether the type needs precision
 */
export declare const needsPrecision: (dataType: string) => boolean;
/**
 * Categorizes numeric SQL data types into their respective categories
 * @param dataType - The SQL data type to categorize
 * @returns The category of the numeric type ('integer', 'decimal', 'floating') or null if not numeric
 */
export declare const getNumericTypeCategory: (dataType: string) => "integer" | "decimal" | "floating" | null;
