export const TEXTS = {
  TITLES: {
    UPLOAD: 'Upload',
    MAPPING: 'Map Columns',
    REVIEW: 'Review',
    COMPLETE: 'Complete',
  },
  STEPS: {
    UPLOAD: 'Upload',
    MAPPING: 'Map Columns',
    REVIEW: 'Review',
    COMPLETE: 'Complete',
  },
  DROPZONE: {
    TITLE: 'Drop your file here or ',
    BROWSE: 'Browse',
    SUBTITLE: 'Bring any .csv or .xlsx file here to start Import',
    FILE_SELECTION: 'File selected successfully',
  },
  PHASE1: {
    SELECT_TITLE: 'Template',
    SELECT_EXCEL_SHEET: 'Select sheet to Import',
    SELECT_EXCEL_SHEET_PLACEHOLDER: 'Select Excel sheet',
    SELECT_PLACEHOLDER: 'Select Template',
    DOWNLOAD_SAMPLE_TITLE: 'Download sample csv file',
    DOWNLOAD_SAMPLE: 'Download sample',
    SEE_MAPPING: 'See Mapping',
    SELECT_FILE: 'Select a file',
  },
  PHASE2: {
    UPLOAD_AGAIN: 'Upload Again',
    SEE_REVIEW: 'Review Data',
    NAME_IN_SCHEMA_TITLE: 'Column in schema',
    NAME_IN_SHEET_TITLE: 'Column in your sheet',
  },
  PHASE3: {
    EXPORT_DATA: 'Export Data',
    RE_REVIEW_DATA: 'Re-Review Data',
    COMPLETE: 'Complete',
    ALL_VALID_CONFIRMATION: 'All {total} row(s) found valid! Would you like to complete the Import?',
  },
  PHASE4: {
    CLOSE: 'Close',
  },
  COMPLETE: {
    TITLE: 'Bravo! {count} rows have been uploaded',
    SUB_TITLE: '{count} rows have been uploaded successfully, and currently is in process, it will be ready shortly.',
    UPLOAD_AGAIN: 'Upload new File',
  },
  SELECT_SHEET_MODAL: {
    SELECT: 'Select',
  },
  DELETE_CONFIRMATION: {
    TITLE: `{total} rows will be deleted. Are you sure?`,
    SUBTITLE: 'This action cannot be undone.',
    YES: 'Yes',
    NO: 'Cancel',
  },
  PROMPT: {
    TITLE: `Are you sure? You will lose your work in progress.`,
    SUBTITLE_CLOSE: 'Your import is in progress, clicking <b>Yes</b> will reset it.',
    SUBTITLE_RESET: 'Your import is in progress, clicking <b>Yes</b> will reset it.',
    YES: 'Yes',
    NO: 'No',
  },
  VALIDATION: {
    REQUIRED_SELECT: 'Please select value from the list',
    TEMPLATE_REQUIRED: 'Template is required',
    FILE_REQUIRED: 'File is required',
  },
  NOTIFICATIONS: {
    INCOMPLETE_TEMPLATE: {
      title: 'Sorry!',
      message: 'This import do not have any columns. Please try again after some time!',
    },
    TEMPLATE_NOT_FOUND: {
      title: 'Sorry!',
      message:
        "We couldn't find the template you're importing, Our team is informed about it. Please try again after some time!",
    },
  },
};
