import { BE_DATE_FORMAT, DATE_FORMAT } from "../consts/Date";

import format from "date-fns/format";
import { isValid } from "date-fns";
import parseISO from "date-fns/parseISO";

const leftPadWithZero = (x) => {
  return `${x}`.length < 2 ? `0${x}` : x;
};

// This function with create the current UTC date or convert a date to UTC because JavaScript is trash
// Stolen from https://github.com/date-fns/date-fns/issues/376#issuecomment-353871093

/**
 * Exposed interface: Get date as UTC string.
 * @public
 * @param {string} dateString - date as a string
 * @param {string} dateFormat - desired dateFormat, eg: "yyyy-MM-dd HH:mm:ss" (https://date-fns.org/v2.21.3/docs/format)
 * @returns {String} - date string as UTC.
 */
export const getUTCDateAsString = (dateString, dateFormat) => {
  let date = format(dateString, dateFormat);
  date = getUTCDate(date);
  return format(date, dateFormat);
};

/**
 * Exposed interface: Get date as local date string.
 * @public
 * @param {string} dateString - date as a string
 * @param {string} dateFormat - desired dateFormat, eg: "yyyy-MM-dd HH:mm:ss" (https://date-fns.org/v2.21.3/docs/format)
 * @returns {String} - date string as local date.
 */
export const getDateAsLocalDateString = (dateString, dateFormat) => {
  let date = format(dateString, dateFormat);
  date = toLocalDate(date);
  return format(date, dateFormat);
};

/**
 * Exposed interface: Get the date as a UTC date object.
 * @public
 * @param {string} dateString - date as a string
 * @returns {Date} - date object as UTC.
 */
export const getUTCDate = (dateString) => {
  let date = new Date();
  if (dateString) {
    date = parseISO(dateString);
  }

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

/**
 * Exposed interface: Get the date as a local date time object.
 * @public
 * @param {string} dateString - date as a string
 * @returns {Date} - date object as local date time.
 */
export const toLocalDate = (dateString = Date.now()) => {
  const date = parseISO(dateString);

  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );
};

export const localDateToUTCDate = (date) =>
  new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );

/**
 * Exposed interface: Get the utc string.
 * @public
 * @param {Date} date - date object
 * @param {object} overrides - date object
 * @returns {string} - dateString object as local date time.
 */
export const localDateToUTCString = (
  date,
  { year, month, day, hours, minutes, seconds } = {}
) => {
  if (date) {
    return `${year || date.getUTCFullYear()}-${leftPadWithZero(
      month || date.getUTCMonth() + 1
    )}-${leftPadWithZero(day || date.getUTCDate())} ${leftPadWithZero(
      hours !== undefined ? hours : date.getUTCHours()
    )}:${leftPadWithZero(
      minutes !== undefined ? minutes : date.getUTCMinutes()
    )}:${leftPadWithZero(
      seconds !== undefined ? seconds : date.getUTCSeconds()
    )}`;
  }
};

/**
 * Exposed interface: Get the date as a local date time object.
 * @public
 * @param {string} dateString - date as a string
 * @returns {Date} - date object as local date time.
 */
export const utcStringToLocalDate = (dateString) => {
  if (dateString && typeof dateString === "string") {
    try {
      const date = parseISO(dateString);

      if (!isValid(date)) return new Date(1970, 0, 1);

      return new Date(
        Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds()
        )
      );
    } catch {
      return new Date(1970, 0, 1);
    }
  }
};

export const formatDate = (date) => format(date, DATE_FORMAT.DATE);
export const formatTime = (date) => format(date, DATE_FORMAT.TIME);
export const formatDateTime = (date) =>
  format(date, `${DATE_FORMAT.DATE} ${DATE_FORMAT.TIME}`);

export const formatDateTimeBE = (date) =>
  format(date, `${BE_DATE_FORMAT.DATE} ${BE_DATE_FORMAT.TIME}`);
