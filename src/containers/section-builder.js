import { DEFAULT_COLOR } from '../config/fullpage-options';

import { getTemplate } from '../templates/provider';

const urlify = text =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '-')
    .replace(/^-+|-+$/g, '');

const getNavigationTooltips = sectionList =>
  sectionList.length > 0
    ? sectionList.map(section =>
        section.config && section.config.tooltip ? section.config.tooltip : ''
      )
    : [];

const getAnchors = sectionList =>
  sectionList.length > 0
    ? sectionList.map(section =>
        section.config && section.config.tooltip
          ? urlify(section.config.tooltip)
          : `${section.order}`
      )
    : [];

const getSectionsColor = sectionList =>
  sectionList.length > 0
    ? sectionList.map(section =>
        section.config && section.config.color
          ? section.config.color
          : DEFAULT_COLOR
      )
    : [];

const getFullpageOption = optionName => {
  switch (optionName) {
    case 'navigationTooltips':
      return getNavigationTooltips;
    case 'anchors':
      return getAnchors;
    case 'sectionsColor':
      return getSectionsColor;
    default:
      return null;
  }
};

const buildSectionViews = sectionList =>
  sectionList.length > 0
    ? sectionList.map(templateData => {
        const { template, order } = templateData;
        if (template) {
          return getTemplate(template, order, {
            templateData,
          });
        }
        return getTemplate('empty', templateData.order);
      })
    : getTemplate('empty');

export { buildSectionViews, getFullpageOption };