import React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import markdown from './april-2019-update.md';

export default function Page() {
  return <TopLayoutBlog markdown={markdown} />;
}
