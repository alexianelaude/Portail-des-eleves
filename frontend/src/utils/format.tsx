import { Fragment } from "react";
import React from "react";

export const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export const MONTHS_SHORT = [
  "jan.",
  "fév.",
  "mars",
  "avr.",
  "mai",
  "juin",
  "juil.",
  "août",
  "sept.",
  "oct.",
  "nov.",
  "déc.",
];

export const WEEKDAYS_LONG = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

export const WEEKDAYS_SHORT = [
  "dim.",
  "lun.",
  "mar.",
  "mer.",
  "jeu.",
  "ven.",
  "sam.",
];

/**
 * Format a date as `month YYYY`.
 */
export const formatLongDateMonthYear = (date?: Date) =>
  date
    ? `${MONTHS[
        date.getMonth()
      ].toLowerCase()} ${date.getFullYear().toString().padStart(4, "0")}`
    : "";

/**
 * Format a date as `DD month YYYY`.
 */
export const formatLongDate = (date?: Date) =>
  date
    ? `${date.getDate().toString().padStart(2, "0")} ${MONTHS[
        date.getMonth()
      ].toLowerCase()} ${date.getFullYear().toString().padStart(4, "0")}`
    : "";

export const HOURS = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
];
export const MINUTES = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
];

/**
 * Format a date as DD/MM/YYYY.
 * The day and the month are left-padded with "0" until reaching two digits.
 * The year is left-padded with "0" until reaching four digits.
 */
export const formatDate = (date?: Date) =>
  date
    ? date.getDate().toString().padStart(2, "0") +
      "/" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      date.getFullYear().toString().padStart(4, "0")
    : "";

/**
 * Format a date as `HH:mm`.
 * The hours and the minutes are left-padded with "0" until reaching two digits.
 */
export const formatTime = (date?: Date) =>
  date
    ? date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0")
    : "";

/**
 * Return `singularForm` if abs(decider) < 2, `pluralForm` otherwise (French rules).
 */
export const decidePlural = (
  decider: number,
  singularForm: string,
  pluralForm: string
) => (Math.abs(decider) < 2 ? singularForm : pluralForm);

/**
 * Formats a price with nice decimals and the euro sign
 * @param price the value to format
 */
export const formatPrice = (price) =>
  Number(price).toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    currency: "EUR",
    style: "currency",
  });

/**
 * Converts plain text to React fragment to display newlines as <br/>
 * @param text
 */
export const formatNewLines = (text) =>
  text.split("\n").map((item, key) => (
    <Fragment key={key}>
      {item}
      <br />
    </Fragment>
  ));
