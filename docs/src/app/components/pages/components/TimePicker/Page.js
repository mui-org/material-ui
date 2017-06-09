import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import timePickerReadmeText from './README';
import TimePickerExampleSimple from './ExampleSimple';
import timePickerExampleSimpleCode from '!raw!./ExampleSimple';
import TimePickerExampleComplex from './ExampleComplex';
import timePickerExampleComplexCode from '!raw!./ExampleComplex';
import TimePickerInline from './ExampleInline';
import timePickerInlineCode from '!raw!./ExampleInline';
import TimePickerExampleInternational from './ExampleInternational';
import timePickerExampleInternationalCode from '!raw!./ExampleInternational';
import TimePickerExampleStep from './ExampleStep';
import timePickerExampleStepCode from '!raw!./ExampleStep';
import timePickerCode from '!raw!material-ui/TimePicker/TimePicker';

const descriptions = {
  simple: 'Time Picker supports 12 hour and 24 hour formats. In 12 hour format the AM and PM indicators toggle the ' +
  'selected time period. You can also disable the Dialog passing true to the disabled property.',
  inline: 'Inline Time Pickers are displayed below the input, rather than as a modal dialog.',
  controlled: '`TimePicker` can be used as a controlled component.',
  localised: 'The buttons can be localised using the `cancelLabel` and `okLabel` properties.',
  step: 'The number of minutes on each step can be configured using the `minutesStep` property.',
};

const TimePickersPage = () => (
  <div>
    <Title render={(previousTitle) => `Time Picker - ${previousTitle}`} />
    <MarkdownElement text={timePickerReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={timePickerExampleSimpleCode}
    >
      <TimePickerExampleSimple />
    </CodeExample>
    <CodeExample
      title="Inline examples"
      description={descriptions.inline}
      code={timePickerInlineCode}
    >
      <TimePickerInline />
    </CodeExample>
    <CodeExample
      title="Controlled examples"
      description={descriptions.controlled}
      code={timePickerExampleComplexCode}
    >
      <TimePickerExampleComplex />
    </CodeExample>
    <CodeExample
      title="Localised example"
      description={descriptions.localised}
      code={timePickerExampleInternationalCode}
    >
      <TimePickerExampleInternational />
    </CodeExample>
    <CodeExample
      title="Step example"
      description={descriptions.step}
      code={timePickerExampleStepCode}
    >
      <TimePickerExampleStep />
    </CodeExample>
    <PropTypeDescription code={timePickerCode} />
  </div>
);

export default TimePickersPage;
