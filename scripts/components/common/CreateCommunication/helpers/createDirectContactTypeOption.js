import {
  constituentTypeID,
  organisationTypeID,
} from "../consts/contactTypeIDs";

export const constituentDefaultTemplateName = "Default - Constituent";

/**
 * Returns contact type objects containing translated strings of
 * "The Organisation" or "The Constituent" depending on isOrganisation key
 * found on a constituent object.
 *
 * @param {Object} Object - The entity object
 * @param {Object} iln - the translation object from TranslationContext
 * @param {Function} iln.gettext - function for obtaining translated strings
 */
const createDirectContactTypeOption = ({ isOrganisation }, iln) =>
  isOrganisation
    ? {
        question: iln.gettext("Write to the organisation or a connection"),
        id: organisationTypeID,
        name: iln.gettext("The Organisation"),
        default_letter_template_id: 2,
        default_template_name: constituentDefaultTemplateName,
      }
    : {
        question: iln.gettext("Write to the constituent or a connection"),
        id: constituentTypeID,
        name: iln.gettext("The Constituent"),
        default_letter_template_id: 1,
        default_template_name: constituentDefaultTemplateName,
      };

export default createDirectContactTypeOption;
