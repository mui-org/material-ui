let React = require('react');
let { FontIcon, IconButton, NavigationMenu } = require('material-ui');
let ComponentDoc = require('../../component-doc');
let ActionGrade = require('svg-icons/action/grade');
let ActionHome = require('svg-icons/action/home');


class IconButtonsPage extends React.Component {

  render() {

    let code =
        '//Method 1: muidocs-icon-github is defined in a style sheet.\n' +
        '<IconButton iconClassName="muidocs-icon-custom-github" tooltip="GitHub"/>\n\n' +
        '//Method 2: ActionGrade is a component created using mui.SvgIcon.\n' +
        '<IconButton tooltip="Star" touch={true}>\n' +
        '  <ActionGrade/>\n' +
        '</IconButton>\n\n' +
        '//Method 3: Manually creating a mui.FontIcon component within ' +
        'IconButton\n' +
        '<IconButton tooltip="Sort" disabled={true}>\n' +
        '  <FontIcon className="muidocs-icon-custom-sort"/>\n' +
        '</IconButton>\n\n' +
        '//Method 4: Using Google material-icons\n' + 
        ' <IconButton className="material-icons" tooltipAlignment="bottom-center" \n' + 
        '  tooltip=face>face</IconButton>';

    let desc = (
      <p>
        This component generates a button element and all props.
        Also, focus styles will happen on tab but not on click.
        There are three ways to add an icon:
        <br/>
        <ol>
          <li>
            For stylesheets: Set the prop "iconClassName" to the
            classname for you icon.
          </li>
          <li>
            For svg icons: Insert the svg component as a child of icon
            buttons. This is the method we are using. <a title="Source
            code for ActionGrade" href="https://github.com/mmrtnz/material-ui/blob/font-icon-components/docs/src/app/components/svg-icons/action-grade.jsx">
            View our source</a> to see how ActionGrade was created
            using mui.SvgIcon.
          </li>
          <li>
            Alternative: You can also insert a <a title="Redirect to
            Material UI's FontIcon component" href="#/components/icons">
            FontIcon</a> component as a child of IconButton. This is
            similiar to how the iconClassName prop from method 1 is
            handled.
          </li>
          <li>
            Google Material Icons: Now also supported for iconButtons by passing "material-icons" in 
            iconClassName prop.
          </li>
        </ol>
      </p>
    );

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'iconClassName',
            type: 'string',
            header: 'optional',
            desc: 'If you are using a stylesheet for your icons, enter the ' +
                  'class name for the icon to be used here.'
          },
          {
            name: 'iconStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the inline-styles of the icon element.'
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the button\'s root element.'
          },
          {
            name: 'tooltip',
            type: 'string',
            header: 'optional',
            desc: 'The tooltip text to show.'
          },
          {
            name: 'tooltipPosition',
            type: 'string',
            header: 'default: bottom-center',
            desc: 'Allows the tooltip to be viewed with different alignments: "bottom-center", "top-center", "bottom-right", "top-right", "bottom-left" and "top-left"'
          },
          {
            name: 'touch',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, this component will render the touch sized tooltip.'
          }
        ]
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onBlur',
            header: 'IconButton.onBlur(e)',
            desc: 'Callback function for when the component loses focus.'
          },
          {
            name: 'onFocus',
            header: 'IconButton.onFocus(e)',
            desc: 'Callback function for when the component gains focus.'
          }
        ]
      }
    ];

    return (
      <ComponentDoc
        name="Icon Buttons"
        code={code}
        desc={desc}
        componentInfo={componentInfo}>

        <IconButton iconClassName="muidocs-icon-custom-github" tooltip="bottom-right"  tooltipPosition = "bottom-right" />

        <IconButton iconClassName="muidocs-icon-custom-github" tooltip="bottom-center" tooltipPosition = "bottom-center" />

        <IconButton iconClassName="muidocs-icon-custom-github" tooltip="bottom-left" tooltipPosition = "bottom-left" />

        <IconButton iconClassName="muidocs-icon-custom-github" tooltip="top-right" tooltipPosition = "top-right" />

        <IconButton iconClassName="muidocs-icon-custom-github" tooltip="top-center" tooltipPosition = "top-center" />

        <IconButton iconClassName="muidocs-icon-custom-github" tooltip="top-left" tooltipPosition = "top-left" />
        <br/><br/><br/><br/>

        <IconButton tooltip="bottom-right" touch={true} tooltipPosition="bottom-right">
          <ActionGrade/>
        </IconButton>

        <IconButton tooltip="bottom-center" touch={true} tooltipPosition="bottom-center">
          <ActionGrade/>
        </IconButton>

        <IconButton tooltip="bottom-left" touch={true} tooltipPosition="bottom-left">
          <ActionGrade/>
        </IconButton>

        <IconButton tooltip="top-right" touch={true} tooltipPosition="top-right">
          <ActionGrade/>
        </IconButton>

        <IconButton tooltip="top-center" touch={true} tooltipPosition="top-center">
          <ActionGrade/>
        </IconButton>

        <IconButton tooltip="top-left" touch={true} tooltipPosition="top-left">
          <ActionGrade/>
        </IconButton>
        <br/><br/><br/>

        <IconButton tooltip="Sort" disabled={true}>
          <FontIcon className="muidocs-icon-custom-sort"/>
        </IconButton>
        <br/><br/><br/>

        <IconButton iconClassName="material-icons" tooltip="Face">face</IconButton>

      </ComponentDoc>
    );

  }

}

module.exports = IconButtonsPage;