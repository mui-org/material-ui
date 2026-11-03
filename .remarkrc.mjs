import { createRemarkConfig } from '@mui/internal-code-infra/remark';

export default createRemarkConfig({
  overrides: [
    {
      files: '**/*.md',
      rules: {
        'no-duplicate-headings': false,
      },
    },
    {
      files: '.github/**/*.md',
      rules: {
        'mui-first-block-heading': false,
      },
    },
  ],
});
