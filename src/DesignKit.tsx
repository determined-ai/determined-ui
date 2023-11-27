import { Card as AntDCard, App, Space } from 'antd';
import { SelectValue } from 'antd/es/select';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Accordion from 'kit/Accordion';
import Avatar, { AvatarGroup, Size as AvatarSize } from 'kit/Avatar';
import Badge from 'kit/Badge';
import Breadcrumb from 'kit/Breadcrumb';
import Button from 'kit/Button';
import Card from 'kit/Card';
import Checkbox from 'kit/Checkbox';
import ClipboardButton from 'kit/ClipboardButton';
import CodeEditor from 'kit/CodeEditor';
import CodeSample from 'kit/CodeSample';
import Collection, { LayoutMode } from 'kit/Collection';
import Column from 'kit/Column';
import DatePicker from 'kit/DatePicker';
import Drawer from 'kit/Drawer';
import Dropdown, { MenuItem } from 'kit/Dropdown';
import Form from 'kit/Form';
import Glossary from 'kit/Glossary';
import Icon, { IconNameArray, IconSizeArray } from 'kit/Icon';
import InlineForm from 'kit/InlineForm';
import Input from 'kit/Input';
import InputNumber from 'kit/InputNumber';
import InputSearch from 'kit/InputSearch';
import InputShortcut, { KeyboardShortcut } from 'kit/InputShortcut';
import { hex2hsl } from 'kit/internal/functions';
import { getSystemMode, Mode } from 'kit/internal/Theme/theme';
import { Document, Log, LogLevel, Serie, XAxisDomain } from 'kit/internal/types';
import { drawPointsPlugin } from 'kit/internal/UPlot/UPlotChart/drawPointsPlugin';
import { LineChart } from 'kit/LineChart';
import { SyncProvider } from 'kit/LineChart/SyncProvider';
import { useChartGrid } from 'kit/LineChart/useChartGrid';
import KitLink from 'kit/Link';
import LogViewer from 'kit/LogViewer/LogViewer';
import Message from 'kit/Message';
import { Modal, useModal } from 'kit/Modal';
import Nameplate from 'kit/Nameplate';
import Pagination from 'kit/Pagination';
import Pivot from 'kit/Pivot';
import Progress from 'kit/Progress';
import RadioGroup from 'kit/RadioGroup';
import ResponsiveGroup from 'kit/ResponsiveGroup';
import RichTextEditor from 'kit/RichTextEditor';
import Row from 'kit/Row';
import Section from 'kit/Section';
import Select, { Option } from 'kit/Select';
import Spinner from 'kit/Spinner';
import SplitPane, { Pane } from 'kit/SplitPane';
import Surface from 'kit/Surface';
import UIProvider, { DefaultTheme, ElevationLevels, ShirtSize, Theme, useTheme } from 'kit/Theme';
import { themeBase } from 'kit/Theme/themeUtils';
import { useToast } from 'kit/Toast';
import Toggle from 'kit/Toggle';
import Tooltip from 'kit/Tooltip';
import { Body, Code, Label, Title, TypographySize } from 'kit/Typography';
import useConfirm, { ConfirmationProvider, voidPromiseFn } from 'kit/useConfirm';
import { useTags } from 'kit/useTags';
import { Loadable, Loaded, NotLoaded } from 'kit/utils/loadable';
import {
  Background,
  Brand,
  Float,
  Interactive,
  Overlay,
  Stage,
  Status,
  Surface as SurfaceColor,
} from 'utils/colors';
import loremIpsum, { loremIpsumSentence } from 'utils/loremIpsum';

import css from './DesignKit.module.scss';
import ThemeToggle from './ThemeToggle';

const noOp = () => {};

const ComponentTitles = {
  Accordion: 'Accordion',
  Avatar: 'Avatar',
  Badges: 'Badges',
  Breadcrumbs: 'Breadcrumbs',
  Buttons: 'Buttons',
  Cards: 'Cards',
  Charts: 'Charts',
  Checkboxes: 'Checkboxes',
  ClipboardButton: 'ClipboardButton',
  CodeEditor: 'CodeEditor',
  CodeSample: 'CodeSample',
  Collection: 'Collection',
  Color: 'Color',
  Column: 'Column and Row',
  DatePicker: 'DatePicker',
  Drawer: 'Drawer',
  Dropdown: 'Dropdown',
  Form: 'Form',
  Glossary: 'Glossary',
  Icons: 'Icons',
  InlineForm: 'InlineForm',
  Input: 'Input',
  InputNumber: 'InputNumber',
  InputSearch: 'InputSearch',
  InputShortcut: 'InputShortcut',
  Link: 'Link',
  LogViewer: 'LogViewer',
  Message: 'Message',
  Modals: 'Modals',
  Nameplate: 'Nameplate',
  Pagination: 'Pagination',
  Pivot: 'Pivot',
  Progress: 'Progress',
  RadioGroup: 'RadioGroup',
  ResponsiveGroup: 'ResponsiveGroup',
  RichTextEditor: 'RichTextEditor',
  Section: 'Section',
  Select: 'Select',
  Spinner: 'Spinner',
  SplitPane: 'SplitPane',
  Surface: 'Surface',
  Tags: 'Tags',
  Theme: 'Theme',
  Toast: 'Toast',
  Toggle: 'Toggle',
  Tooltips: 'Tooltips',
  Typography: 'Typography',
} as const;

type ComponentIds = keyof typeof ComponentTitles;

const componentOrder = Object.entries(ComponentTitles)
  .sort((pair1, pair2) => pair1[1].localeCompare(pair2[1]))
  .map((pair) => pair[0] as keyof typeof ComponentTitles);

interface Props {
  children?: React.ReactNode;
  id: ComponentIds;
}

const ComponentSection: React.FC<Props> = ({ children, id }: Props): JSX.Element => {
  return (
    <article>
      <h3 id={id}>{ComponentTitles[id]}</h3>
      {children}
    </article>
  );
};

const SectionComponentSection: React.FC = () => {
  return (
    <ComponentSection id="Section">
      <AntDCard>
        <p>A Section component serves the purpose to encapsulate any type of content.</p>
      </AntDCard>
      <AntDCard title="Usage">
        <p>Section without title</p>
        <Section>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo voluptatem porro
            exercitationem, labore, suscipit atque ullam...
          </p>
          <Button>foo button</Button>
        </Section>
        <br />
        <p>Section with title</p>
        <Section title="Title of the section">
          <Select
            options={[
              { label: 'Option 1', value: 1 },
              { label: 'Option 2', value: 2 },
              { label: 'Option 3', value: 3 },
            ]}
            placeholder="Select"
          />
        </Section>
        <br />
        <p>Section with title divider</p>
        <Section title="Title of the section" titleDivider>
          <Checkbox checked>Checked checkbox</Checkbox>
          <Checkbox checked={false}>Unchecked checkbox</Checkbox>
          <Checkbox checked disabled>
            Disabled checked checkbox
          </Checkbox>
        </Section>
        <br />
        <p>Multiple sections</p>
        <Section title="Title of the section 1">
          <InputSearch placeholder="input search text" />
        </Section>
        <Section title="Title of the section 2">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo voluptatem porro
            exercitationem, labore, suscipit atque ullam...
          </p>
        </Section>
        <Section title="Title of the section 3">
          <InputNumber />
        </Section>
      </AntDCard>
    </ComponentSection>
  );
};

const LinkSection: React.FC = () => {
  return (
    <ComponentSection id="Link">
      <AntDCard>
        <p>
          <code>{'<Link>'}</code> lets the user navigate to another page by clicking or tapping on
          it.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Default Usage</strong>
        <KitLink href="#Link">Link</KitLink>
        <strong>Links of different sizes</strong>
        <Space>
          <KitLink href="#Link" size="tiny">
            Tiny
          </KitLink>
          <KitLink href="#Link" size="small">
            Small
          </KitLink>
          <KitLink href="#Link" size="medium">
            Medium
          </KitLink>
          <KitLink href="#Link" size="large">
            Large
          </KitLink>
        </Space>
        <strong>External Link</strong>
        <KitLink external onClick={() => window.open('https://www.determined.ai/', '_blank')}>
          External link at a new tab
        </KitLink>
        <strong>Disabled Link</strong>
        <KitLink disabled href="#Link">
          Disabled link
        </KitLink>
      </AntDCard>
    </ComponentSection>
  );
};

const ButtonsSection: React.FC = () => {
  const menu: MenuItem[] = [
    { key: 'start', label: 'Start' },
    { key: 'stop', label: 'Stop' },
  ];
  return (
    <ComponentSection id="Buttons">
      <AntDCard>
        <p>
          <code>{'<Button>'}</code>s give people a way to trigger an action. They&apos;re typically
          found in forms, dialog panels, and dialogs. Some buttons are specialized for particular
          tasks, such as navigation, repeated actions, or presenting menus.
        </p>
      </AntDCard>
      <AntDCard title="Best practices">
        <strong>Layout</strong>
        <ul>
          <li>
            For dialog boxes and panels, where people are moving through a sequence of screens,
            right-align buttons with the container.
          </li>
          <li>For single-page forms and focused tasks, left-align buttons with the container.</li>
          <li>
            Always place the primary button on the left, the secondary button just to the right of
            it.
          </li>
          <li>
            Show only one primary button that inherits theme color at rest state. If there are more
            than two buttons with equal priority, all buttons should have neutral backgrounds.
          </li>
          <li>
            Don&apos;t use a button to navigate to another place; use a link instead. The exception
            is in a wizard where &quot;Back&quot; and &quot;Next&quot; buttons may be used.
          </li>
          <li>
            Don&apos;t place the default focus on a button that destroys data. Instead, place the
            default focus on the button that performs the &quot;safe act&quot; and retains the
            content (such as &quot;Save&quot;) or cancels the action (such as &quot;Cancel&quot;).
          </li>
        </ul>
        <strong>Content</strong>
        <ul>
          <li>Use sentence-style capitalization—only capitalize the first word.</li>
          <li>
            Make sure it&apos;s clear what will happen when people interact with the button. Be
            concise; usually a single verb is best. Include a noun if there is any room for
            interpretation about what the verb means. For example, &quot;Delete folder&quot; or
            &quot;Create account&quot;.
          </li>
        </ul>
        <strong>Accessibility</strong>
        <ul>
          <li>Always enable the user to navigate to focus on buttons using their keyboard.</li>
          <li>Buttons need to have accessible naming.</li>
          <li>Aria- and roles need to have consistent (non-generic) attributes.</li>
        </ul>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Default Button variations</strong>
        Transparent background, solid border
        <Space>
          <Button>Default</Button>
          <Button danger>Danger</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button selected>Selected</Button>
        </Space>
        <hr />
        <strong>Primary Button variations</strong>
        Solid background, no border
        <Space>
          <Button type="primary">Primary</Button>
          <Button danger type="primary">
            Danger
          </Button>
          <Button disabled type="primary">
            Disabled
          </Button>
          <Button loading type="primary">
            Loading
          </Button>
          <Button selected type="primary">
            Selected
          </Button>
        </Space>
        <hr />
        <strong>Text Button variations</strong>
        Transparent background, no border
        <Space>
          <Button type="text">Text</Button>
          <Button danger type="text">
            Danger
          </Button>
          <Button disabled type="text">
            Disabled
          </Button>
          <Button loading type="text">
            Loading
          </Button>
          <Button selected type="text">
            Selected
          </Button>
        </Space>
        <hr />
        <strong>Dashed Button variations</strong>
        Transparent background, dashed border
        <Space>
          <Button type="dashed">Dashed</Button>
          <Button danger type="dashed">
            Danger
          </Button>
          <Button disabled type="dashed">
            Disabled
          </Button>
          <Button loading type="dashed">
            Loading
          </Button>
          <Button selected type="dashed">
            Selected
          </Button>
        </Space>
        <hr />
        <strong>Full-width buttons</strong>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button block>Default</Button>
          <Button block type="primary">
            Primary
          </Button>
          <Button block type="text">
            Text
          </Button>
          <Button block type="dashed">
            Dashed
          </Button>
        </Space>
        <hr />
        <strong>Sizes</strong>
        <Space>
          <Button size="large">Large</Button>
          <Button size="middle">Middle</Button>
          <Button size="small">Small</Button>
        </Space>
        <hr />
        <strong>With icon</strong>
        With Icon
        <Space>
          <Button icon={<Icon name="panel" title="compare" />} />
          <Button icon={<Icon name="panel" title="compare" />}>SVG icon</Button>
          <Button icon={<Icon name="power" title="power" />} />
          <Button icon={<Icon name="power" title="power" />}>SVG icon</Button>
        </Space>
        With font icon
        <Space>
          <Button icon={<Icon name="play" size="large" title="Play" />} />
          <Button icon={<Icon name="play" size="large" title="Play" />}>Large font icon</Button>
          <Button icon={<Icon name="play" size="tiny" title="Play" />} />
          <Button icon={<Icon name="play" size="tiny" title="Play" />}>Tiny font icon</Button>
        </Space>
        As Dropdown trigger with icon
        <Space>
          <Dropdown menu={menu}>
            <Button icon={<Icon name="power" title="power" />} />
          </Dropdown>
          <Dropdown menu={menu}>
            <Button icon={<Icon name="power" title="power" />}>SVG icon</Button>
          </Dropdown>
          <Dropdown menu={menu}>
            <Button icon={<Icon name="play" size="large" title="Play" />} />
          </Dropdown>
          <Dropdown menu={menu}>
            <Button icon={<Icon name="play" size="large" title="Play" />}>Font icon</Button>
          </Dropdown>
        </Space>
        With icon and text displayed in a column
        <Space>
          <Button column icon={<Icon name="power" title="power" />} size="small">
            Column Small
          </Button>
          <Button column icon={<Icon name="power" title="power" />} size="middle">
            Column Middle
          </Button>
          <Button column icon={<Icon name="power" title="power" />} size="large">
            Column Large
          </Button>
        </Space>
      </AntDCard>
    </ComponentSection>
  );
};

const SelectSection: React.FC = () => {
  const [multiSelectValues, setMultiSelectValues] = useState<SelectValue>();
  const [clearableSelectValues, setClearableSelectValues] = useState<SelectValue>();
  const [sortedSelectValues, setSortedSelectValues] = useState<SelectValue>();

  return (
    <ComponentSection id="Select">
      <AntDCard>
        <p>
          A Select (<code>{'<Select>'}</code>) combines a text field and a dropdown giving people a
          way to select an option from a list or enter their own choice.
        </p>
      </AntDCard>
      <AntDCard title="Best practices">
        <strong>Layout</strong>
        <ul>
          <li>
            Use a select when there are multiple choices that can be collapsed under one title, when
            the list of items is long, or when space is constrained.
          </li>
        </ul>
        <strong>Content</strong>
        <ul>
          <li>Use single words or shortened statements as options.</li>
          <li>Don&apos;t use punctuation at the end of options.</li>
        </ul>
        <strong>Accessibility</strong>
        <ul>
          <li>
            Select dropdowns render in their own layer by default to ensure they are not clipped by
            containers with overflow: hidden or overflow: scroll. This causes extra difficulty for
            people who use screen readers, so we recommend rendering the ComboBox options dropdown
            inline unless they are in overflow containers.
          </li>
        </ul>
        <strong>Truncation</strong>
        <ul>
          <li>
            By default, the Select truncates option text instead of wrapping to a new line. Because
            this can lose meaningful information, it is recommended to adjust styles to wrap the
            option text.
          </li>
        </ul>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Default Select</strong>
        <Select
          options={[
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 },
          ]}
          placeholder="Select"
        />
        <strong>Variations</strong>
        <strong>Loading Select</strong>
        <Select
          loading
          options={[
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 },
          ]}
          placeholder="Select"
        />
        <strong>Select with default value</strong>
        <Select
          defaultValue={2}
          options={[
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 },
          ]}
        />
        <strong>Select with label</strong>
        <Select
          label="Select Label"
          options={[
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 },
          ]}
          placeholder="Select"
        />
        <strong>Select without placeholder</strong>
        <Select
          options={[
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 },
          ]}
        />
        <strong>Disabled Select</strong>
        <Select
          defaultValue="disabled"
          disabled
          options={[{ label: 'Disabled', value: 'disabled' }]}
        />
        <strong>Select without search</strong>
        <Select
          options={[
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 },
          ]}
          placeholder="Non-searchable Select"
          searchable={false}
        />
        <strong>Multiple Select with tags</strong>
        <Select
          mode="multiple"
          options={[
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 },
          ]}
          placeholder="Select Tags"
          width={300}
        />
        <strong>Multiple Select with tags disabled</strong>
        <Select
          disableTags
          mode="multiple"
          options={[
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 },
          ]}
          placeholder="Select Multiple"
          value={multiSelectValues}
          width={150}
          onChange={(value) => setMultiSelectValues(value)}
        />
        <strong>Select with tags and custom search</strong>
        <Select
          filterOption={(input, option) =>
            !!(option?.label && option.label.toString().includes(input) === true)
          }
          mode="multiple"
          options={[
            { label: 'Case 1', value: 1 },
            { label: 'Case 2', value: 2 },
            { label: 'Case 3', value: 3 },
          ]}
          placeholder="Case-sensitive Search"
          width={300}
        />
        <strong>Select with sorted search</strong>
        <Select
          disableTags
          filterOption={(input, option) =>
            (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
          }
          filterSort={(a, b) => ((a?.label ? a.label : 0) > (b?.label ? b?.label : 0) ? 1 : -1)}
          mode="multiple"
          options={[
            { label: 'Am', value: 1 },
            { label: 'Az', value: 2 },
            { label: 'Ac', value: 3 },
            { label: 'Aa', value: 4 },
          ]}
          placeholder="Search"
          value={sortedSelectValues}
          width={120}
          onChange={(value) => setSortedSelectValues(value)}
        />
        <strong>Clearable Select</strong>
        <Select
          allowClear
          disableTags
          mode="multiple"
          options={[
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 },
          ]}
          value={clearableSelectValues}
          width={130}
          onChange={(value) => setClearableSelectValues(value)}
        />
        <strong>Responsive Select with large width defined</strong>
        <Select
          disableTags
          options={[
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 },
          ]}
          width={999999}
        />
        <span>
          Also see <a href={`#${ComponentTitles.Form}`}>Form</a> for form-specific variations
        </span>
      </AntDCard>
    </ComponentSection>
  );
};

const UIProviderExample: React.FC<{
  setOpenIndex: (index: number | undefined) => void;
  openIndex: number | undefined;
  index: number;
  themeVariation: { theme: Theme; variation: { color: string; name: string } };
}> = ({ index, themeVariation, openIndex, setOpenIndex }) => {
  const { openToast } = useToast();
  const innerHtml = (
    <>
      <br />
      <strong>
        <p>Spinner</p>
      </strong>
      <br />
      <div style={{ height: '24px' }}>
        <Spinner />
      </div>
      <br />
      <strong>
        <p>Icon with color success</p>
      </strong>
      <br />
      <Icon color="success" name="star" showTooltip title="success" />
      <br />
    </>
  );
  return (
    <>
      <hr />
      <div style={{ margin: '15px 0 45px 0' }}>
        <div
          style={{
            marginBottom: '20px',
            width: '250px',
          }}>
          <strong>
            <p>Variation</p>
          </strong>
          <br />
          <strong>
            <p>Color</p>
          </strong>{' '}
          <br />
          {themeVariation.variation.name.replace(/(var\(|\))/g, '')}
          <div
            style={{
              backgroundColor: themeVariation.variation.color,
              border: 'var(--theme-stroke-width) solid var(--theme-surface-border)',
              borderRadius: 'var(--theme-border-radius)',
              height: '40px',
              width: '100%',
            }}
          />
          {innerHtml}
        </div>
        <strong>
          <p>Drawer</p>
        </strong>
        <br />
        <Space>
          <Button onClick={() => setOpenIndex(index)}>Open Drawer</Button>
        </Space>
        <Drawer
          open={openIndex === index}
          placement="left"
          title="Left Drawer"
          onClose={() => setOpenIndex(undefined)}>
          {innerHtml}
        </Drawer>
      </div>
      <strong>
        <p>Toast</p>
      </strong>
      <br />
      <Button
        onClick={() =>
          openToast({
            description: 'See the themed components',
            link: (
              <>
                <Icon color="success" name="star" showTooltip title="success" />
                <div style={{ height: '24px' }}>
                  <Spinner />
                </div>
              </>
            ),
            severity: 'Error',
            title: 'Themed Components',
          })
        }>
        Open Toast
      </Button>
    </>
  );
};

const UIProviderVariation: React.FC<{
  setOpenIndex: (index: number | undefined) => void;
  openIndex: number | undefined;
  isDarkMode: boolean;
  index: number;
  themeVariation: { theme: Theme; variation: { color: string; name: string } };
}> = ({ isDarkMode, index, themeVariation, openIndex, setOpenIndex }) => {
  return (
    <UIProvider
      key={themeVariation.variation.name}
      theme={themeVariation.theme}
      themeIsDark={isDarkMode}>
      <UIProviderExample
        index={index}
        key={themeVariation.variation.name}
        openIndex={openIndex}
        setOpenIndex={setOpenIndex}
        themeVariation={themeVariation}
      />
    </UIProvider>
  );
};

const ThemeSection: React.FC = () => {
  const {
    themeSettings: { themeIsDark },
  } = useTheme();
  const baseTheme: Theme = themeIsDark ? DefaultTheme.Dark : DefaultTheme.Light;
  const [openIndex, setOpenIndex] = useState<number>();
  const colorVariations = [
    { color: baseTheme.statusActive, name: Status.Active },
    { color: baseTheme.statusCritical, name: Status.Critical },
    { color: baseTheme.statusPendingWeak, name: Status.PendingWeak },
    { color: baseTheme.statusSuccess, name: Status.Success },
    { color: baseTheme.statusWarning, name: Status.Warning },
  ];

  const themes = colorVariations.map((variation) => ({
    theme: {
      ...baseTheme,
      backgroundOnStrong: variation.color,
      brand: variation.color,
      stageBorder: variation.color,
      statusSuccess: variation.color,
    },
    variation,
  }));

  const themeVariations = themes.map((themeVariation, index) => {
    return (
      <UIProviderVariation
        index={index}
        isDarkMode={themeIsDark}
        key={index}
        openIndex={openIndex}
        setOpenIndex={setOpenIndex}
        themeVariation={themeVariation}
      />
    );
  });

  return (
    <ComponentSection id="Theme">
      <AntDCard>
        <p>
          A <code>{'<UIProvider>'}</code> is also included in the UI kit, it is responsible for
          providing styling to children components. It requires a <code>{'theme'}</code> prop that
          is a <code>{'Theme'}</code>
          configuration with the custom theme options shown below. Additionally, it takes an
          optional <code>{'themeIsDark'}</code> prop to switch the supplied theme between light and
          dark mode.
        </p>
        <p>
          There is also a <code>{'useTheme'}</code> hook that can be used from within the UI kit.
          Additionally, default themes are provided.
        </p>
      </AntDCard>
      <AntDCard title="Default Themes">
        <p>
          Several default themes are provided within the UI Kit via <code>{'DefaultTheme'}</code>{' '}
          the options are:
        </p>
        <Collection>
          <ul>
            {Object.keys(DefaultTheme).map((property) => (
              <li key={property}>{property}</li>
            ))}
          </ul>
        </Collection>
      </AntDCard>
      <AntDCard title="useTheme">
        <p>
          Returns properties related to the current <code>{'Theme'}</code>{' '}
        </p>
        <br />
        <p>
          <strong>themeSettings</strong>
        </p>
        <p>
          Includes the css <code>{'className'}</code> used to provide the styling for the theme, and
          the current values for <code>{'themeIsDark'}</code> and current <code>{'theme'}</code>{' '}
        </p>
        <br />
        <p>
          <strong>getThemeVar</strong>
        </p>
        Enables retrieving a value for a specified theme option.
        <br />
      </AntDCard>
      <AntDCard title="Theme Options">
        <p>The UIProvider takes a Theme prop with the following properties:</p>
        <br />
        <Collection>
          {Object.keys(themeBase).map((property) => (
            <p key={property}>{property}</p>
          ))}
        </Collection>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>UIProvider</strong>
        <strong>Variations</strong>
        Each variation displays a custom Theme with the following theme options set to the specified
        color:
        <ul>
          <li>brand</li>
          <li>backgroundOnStrong</li>
          <li>statusSuccess</li>
          <li>stageBorder</li>
        </ul>
        {themeVariations}
      </AntDCard>
    </ComponentSection>
  );
};
const ChartsSection: React.FC = () => {
  const [line1Data, setLine1Data] = useState<[number, number][]>([
    [0, -2],
    [2, 7],
    [4, 15],
    [6, 35],
    [9, 22],
    [10, 76],
    [18, 1],
    [19, 89],
  ]);
  const [line2Data, setLine2Data] = useState<[number, number][]>([
    [1, 15],
    [2, 10.123456789],
    [2.5, 22],
    [3, 10.3909],
    [3.25, 19],
    [3.75, 4],
    [4, 12],
  ]);
  const [timer, setTimer] = useState(line1Data.length);
  useEffect(() => {
    let timeout: number | void;
    if (timer <= line1Data.length) {
      timeout = window.setTimeout(() => setTimer((t) => t + 1), 2000);
    }
    return () => (timeout ? window.clearTimeout(timeout) : undefined);
  }, [timer, line1Data]);

  const randomizeLineData = useCallback(() => {
    setLine1Data([
      [0, -2],
      [2, Math.random() * 12],
      [4, 15],
      [6, Math.random() * 60],
      [9, Math.random() * 40],
      [10, Math.random() * 76],
      [18, Math.random() * 80],
      [19, 89],
    ]);
    setLine2Data([
      [1, 15],
      [2, 10.123456789],
      [2.5, Math.random() * 22],
      [3, 10.3909],
      [3.25, 19],
      [3.75, 4],
      [4, 12],
    ]);
  }, []);
  const streamLineData = useCallback(() => setTimer(1), []);

  const line1BatchesDataStreamed = useMemo(() => line1Data.slice(0, timer), [timer, line1Data]);
  const line2BatchesDataStreamed = useMemo(() => line2Data.slice(0, timer), [timer, line2Data]);
  const drawCheckpointsStreamed = useMemo(() => {
    if (!timer || !line1Data.length) return [];
    const pt = line1Data[Math.min(timer, line1Data.length) - 1];
    return [
      drawPointsPlugin({
        [pt[0]]: {
          experimentId: 0,
          state: 'COMPLETED',
          totalBatches: pt[0],
          trialId: 0,
        },
      }),
    ];
  }, [timer, line1Data]);

  const line1: Serie = {
    color: '#009BDE',
    data: {
      [XAxisDomain.Batches]: line1BatchesDataStreamed,
      [XAxisDomain.Time]: [],
    },
    name: 'training.Line',
  };

  const stampToNum = (tstamp: string): number => new Date(tstamp).getTime() / 1000;

  const line2: Serie = {
    data: {
      [XAxisDomain.Batches]: line2BatchesDataStreamed,
      [XAxisDomain.Time]: [
        [stampToNum('2023-01-05T01:00:00Z'), 15],
        [stampToNum('2023-01-05T02:12:34.56789Z'), 10.123456789],
        [stampToNum('2023-01-05T02:30:00Z'), 22],
        [stampToNum('2023-01-05T03:15:00Z'), 15],
        [stampToNum('2023-01-05T04:02:06Z'), 12],
      ],
    },
    name: 'validation.Line',
  };

  const line3: Serie = {
    data: {
      [XAxisDomain.Time]: [
        [stampToNum('2023-01-05T01:00:00Z'), 12],
        [stampToNum('2023-01-05T02:00:00Z'), 5],
        [stampToNum('2023-01-05T02:30:00Z'), 2],
        [stampToNum('2023-01-05T03:00:00Z'), 10.123456789],
        [stampToNum('2023-01-05T04:00:00Z'), 4],
      ],
    },
    name: 'validation.Alt-Line',
  };

  const line4: Serie = {
    data: {
      [XAxisDomain.Batches]: [
        [1, -1000000],
        [2, 1],
        [3, 2],
        [4, 10000],
        [5, 2000000],
      ],
    },
    name: 'training.Sci-Line',
  };

  const zeroline: Serie = {
    color: '#009BDE',
    data: {
      [XAxisDomain.Batches]: [[0, 1]],
      [XAxisDomain.Time]: [[1697567035, 1]],
    },
    name: 'training.Line',
  };

  const { openToast } = useToast();

  const [xAxis, setXAxis] = useState<XAxisDomain>(XAxisDomain.Batches);
  const createChartGrid = useChartGrid();
  const handleError = () =>
    openToast({
      description: 'Something bad happened!',
      severity: 'Error',
      title: 'Error',
    });
  const xRange = {
    [XAxisDomain.Batches]: [-1, 10] as [number, number],
    [XAxisDomain.Time]: undefined,
    [XAxisDomain.Epochs]: undefined,
  };
  return (
    <ComponentSection id="Charts">
      <AntDCard>
        <p>
          Line Charts (<code>{'<LineChart>'}</code>) are a universal component to create charts for
          learning curve, metrics, cluster history, etc. We currently use the uPlot library.
        </p>
      </AntDCard>
      <AntDCard title="Label options">
        <p>A chart with two metrics, a title, a legend, an x-axis label, a y-axis label.</p>
        <div>
          <Button onClick={randomizeLineData}>Randomize line data</Button>
          <Button onClick={streamLineData}>Stream line data</Button>
        </div>
        <LineChart
          handleError={handleError}
          height={250}
          plugins={drawCheckpointsStreamed}
          series={[line1, line2]}
          showLegend={true}
          title="Sample"
        />
      </AntDCard>
      <AntDCard title="Focus series">
        <p>Highlight a specific metric in the chart.</p>
        <div>
          <Button onClick={randomizeLineData}>Randomize line data</Button>
          <Button onClick={streamLineData}>Stream line data</Button>
        </div>
        <LineChart
          focusedSeries={1}
          handleError={handleError}
          height={250}
          plugins={drawCheckpointsStreamed}
          series={[line1, line2]}
          title="Sample"
        />
      </AntDCard>
      <AntDCard title="Series with all x=0">
        <p>When all points have x=0, the x-axis bounds should go from 0 to 1.</p>
        <LineChart
          handleError={handleError}
          height={250}
          series={[zeroline]}
          title="Series with all x=0"
        />
      </AntDCard>
      <AntDCard title="Series with set x axis range">
        <p>
          The component accepts an <code>xRange</code> prop to set a minimum and maximum x value for
          each XAxisDomain.
        </p>
        <SyncProvider xRange={xRange}>
          <LineChart
            handleError={handleError}
            height={250}
            series={[zeroline]}
            title="Chart with set range [-1, 10]"
            xRange={xRange}
          />
        </SyncProvider>
      </AntDCard>
      <AntDCard title="Series with scientific notation">
        <p>
          The component accepts <code>yTickValues</code> prop for y-axis tick values. The default
          setting uses scientific notation for very small or very large numbers:
        </p>
        <LineChart
          handleError={handleError}
          height={250}
          series={[line4]}
          title="Chart with scientific notation"
        />
      </AntDCard>
      <AntDCard title="Series with single time point">
        <p>
          The component accepts an <code>xRange</code> for the time axis, and can show a legend.
        </p>
        <LineChart
          handleError={handleError}
          height={250}
          series={[zeroline]}
          showLegend
          title="Weekly chart with single time point"
          xAxis={XAxisDomain.Time}
          xRange={{
            [XAxisDomain.Batches]: undefined,
            [XAxisDomain.Time]: [1697135035, 1697739835],
            [XAxisDomain.Epochs]: undefined,
          }}
        />
      </AntDCard>
      <AntDCard title="States without data">
        <strong>Loading</strong>
        <LineChart
          handleError={handleError}
          height={250}
          series={NotLoaded}
          showLegend={true}
          title="Loading state"
        />
        <hr />
        <strong>Empty</strong>
        <LineChart
          handleError={handleError}
          height={250}
          series={[]}
          showLegend={true}
          title="Empty state"
        />
      </AntDCard>
      <AntDCard title="Chart Grid">
        <p>
          A Chart Grid (<code>{'<ChartGrid>'}</code>) can be used to place multiple charts in a
          responsive grid. There is a sync for the plot window, cursor, and selection/zoom of an
          x-axis range. There will be a linear/log scale switch, and if multiple X-axis options are
          provided, an X-axis switch.
        </p>
        {createChartGrid({
          chartsProps: [
            {
              series: [line1],
              showLegend: true,
              title: 'Sample1',
              xAxis,
              xLabel: xAxis,
            },
            {
              series: [line2, line3],
              showLegend: true,
              title: 'Sample2',
              xAxis,
              xLabel: xAxis,
            },
          ],
          handleError,
          onXAxisChange: setXAxis,
          xAxis: xAxis,
        })}
        <hr />
        <strong>Loading</strong>
        {createChartGrid({
          chartsProps: NotLoaded,
          handleError,
          onXAxisChange: setXAxis,
          xAxis: xAxis,
        })}
        <hr />
        <strong>Empty</strong>
        {createChartGrid({
          chartsProps: [],
          handleError,
          onXAxisChange: setXAxis,
          xAxis: xAxis,
        })}
      </AntDCard>
    </ComponentSection>
  );
};

const CheckboxesSection: React.FC = () => {
  return (
    <ComponentSection id="Checkboxes">
      <AntDCard>
        <p>
          Checkboxes (<code>{'<Checkbox>'}</code>) give people a way to select one or more items
          from a group, or switch between two mutually exclusive options (checked or unchecked, on
          or off).
        </p>
      </AntDCard>
      <AntDCard title="Best practices">
        <strong>Layout</strong>
        <ul>
          <li>
            Use a single check box when there&apos;s only one selection to make or choice to
            confirm. Selecting a blank check box selects it. Selecting it again clears the check
            box.
          </li>
          <li>
            Use multiple check boxes when one or more options can be selected from a group. Unlike
            radio buttons, selecting one check box will not clear another check box.
          </li>
        </ul>
        <strong>Content</strong>
        <ul>
          <li>
            Separate two groups of check boxes with headings rather than positioning them one after
            the other.
          </li>
          <li>Use sentence-style capitalization—only capitalize the first word.</li>
          <li>
            Don&apos;t use end punctuation (unless the check box label absolutely requires multiple
            sentences).
          </li>
          <li>Use a sentence fragment for the label, rather than a full sentence.</li>
          <li>
            Make it easy for people to understand what will happen if they select or clear a check
            box.
          </li>
        </ul>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Basic checkboxes</strong>
        <Checkbox>This is a basic checkbox.</Checkbox>
        <strong>Variations</strong>
        <Checkbox checked>Checked checkbox</Checkbox>
        <Checkbox checked={false}>Unchecked checkbox</Checkbox>
        <Checkbox checked disabled>
          Disabled checked checkbox
        </Checkbox>
        <p>Mandatory checkbox - not implemented.</p>
        <p>Mandatory checkbox with info sign - not implemented.</p>
        <Checkbox indeterminate>Indeterminate checkbox</Checkbox>
      </AntDCard>
    </ComponentSection>
  );
};

const ClipboardButtonSection: React.FC = () => {
  const defaultContent = 'This is the content to copy to clipboard.';
  const [content, setContent] = useState(defaultContent);
  const getContent = useCallback(() => content, [content]);
  return (
    <ComponentSection id="ClipboardButton">
      <AntDCard>
        <p>
          ClipboardButton (<code>{'<ClipboardButton>'}</code> provides a special button for the
          purpose of copying some text into the browser clipboard.
          <br />
          <b>Note:</b> This capability is only available on `https` and `localhost` hosts. `http`
          protocol is purposefully blocked for&nbsp;
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Clipboard">security reasons</a>.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <label>Copy Content</label>
        <Input value={content} onChange={(s) => setContent(String(s.target.value))} />
        <hr />
        <strong>Default Clipboard Button</strong>
        <ClipboardButton getContent={getContent} />
        <strong>Disabled Clipboard Button</strong>
        <ClipboardButton disabled getContent={getContent} />
        <strong>Custom Copied Message Clipboard Button</strong>
        <ClipboardButton copiedMessage="Yay it's copied!" getContent={getContent} />
      </AntDCard>
    </ComponentSection>
  );
};

const DropdownSection: React.FC = () => {
  const menu: MenuItem[] = [
    { key: 'start', label: 'Start' },
    { key: 'stop', label: 'Stop' },
  ];
  const menuWithDivider: MenuItem[] = [
    ...menu,
    { type: 'divider' },
    { key: 'archive', label: 'Archive' },
  ];
  const menuWithDanger: MenuItem[] = [...menu, { danger: true, key: 'delete', label: 'Delete' }];
  const menuWithDisabled: MenuItem[] = [
    ...menu,
    { disabled: true, key: 'delete', label: 'Delete' },
  ];

  return (
    <ComponentSection id="Dropdown">
      <AntDCard>
        <p>
          A (<code>{'<Dropdown>'}</code>) is used to display a component when triggered by a child
          element (usually a button). This component can be a menu (a list of actions/options
          defined via the <code>{'menu'}</code> prop), or can be any arbitrary component, defined
          via the <code>{'content'}</code> prop, with default styling applied.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Dropdown variations</strong>
        <Space>
          <Dropdown menu={menu}>
            <Button>Dropdown with menu</Button>
          </Dropdown>
          <Space>
            <Dropdown content={<Input />}>
              <Button>Dropdown with component content</Button>
            </Dropdown>
          </Space>
          <Dropdown disabled menu={menu}>
            <Button>Disabled Dropdown menu</Button>
          </Dropdown>
        </Space>
        <strong>Dropdown menu variations</strong>
        <Space>
          <Dropdown menu={menuWithDivider}>
            <Button>Dropdown menu with a Divider</Button>
          </Dropdown>
          <Dropdown menu={menuWithDanger}>
            <Button>Dropdown menu with Dangerous Option</Button>
          </Dropdown>
          <Dropdown menu={menuWithDisabled}>
            <Button>Dropdown menu with Disabled Option</Button>
          </Dropdown>
        </Space>
      </AntDCard>
    </ComponentSection>
  );
};

const UncontrolledCodeEditor = () => {
  const [path, setPath] = useState<string>('one.yaml');
  const { openToast } = useToast();
  const handleError = () =>
    openToast({
      description: 'Something bad happened!',
      severity: 'Error',
      title: 'Error',
    });
  const file = useMemo(() => {
    if (!path) {
      return NotLoaded;
    }
    return (
      {
        'one.yaml': Loaded(
          'hyperparameters:\n  learning_rate: 1.0\n  global_batch_size: 512\n  n_filters1: 32\n  n_filters2: 64\n  dropout1: 0.25\n  dropout2: 0.5',
        ),
        'two.yaml': Loaded('searcher:\n  name: single\n  metric: validation_loss\n'),
      }[path] || NotLoaded
    );
  }, [path]);
  return (
    <CodeEditor
      file={file}
      files={[
        {
          isLeaf: true,
          key: 'one.yaml',
          title: 'one.yaml',
        },
        {
          isLeaf: true,
          key: 'two.yaml',
          title: 'two.yaml',
        },
        {
          isLeaf: true,
          key: 'unloaded.yaml',
          title: 'unloaded.yaml',
        },
      ]}
      readonly={true}
      selectedFilePath={path}
      onError={handleError}
      onSelectFile={setPath}
    />
  );
};
const CodeEditorSection: React.FC = () => {
  const { openToast } = useToast();
  const handleError = () =>
    openToast({
      description: 'Something bad happened!',
      severity: 'Error',
      title: 'Error',
    });
  return (
    <ComponentSection id="CodeEditor">
      <AntDCard>
        <p>
          The Code Editor (<code>{'<CodeEditor>'}</code>) shows Python and YAML files with syntax
          highlighting. If multiple files are sent, the component shows a file tree browser.
        </p>
        <ul>
          <li>Use the readonly attribute to make code viewable but not editable.</li>
        </ul>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Editable Python file</strong>
        <CodeEditor
          file={Loaded('import math\nprint(math.pi)\n\n')}
          files={[
            {
              key: 'test.py',
              title: 'test.py',
            },
          ]}
          onError={handleError}
        />
        <strong>Read-only YAML file</strong>
        <CodeEditor
          file={Loaded(
            'name: Unicode Test 日本😃\ndata:\n  url: https://example.tar.gz\nhyperparameters:\n  learning_rate: 1.0\n  global_batch_size: 64\n  n_filters1: 32\n  n_filters2: 64\n  dropout1: 0.25\n  dropout2: 0.5\nsearcher:\n  name: single\n  metric: validation_loss\n  max_length:\n      batches: 937 #60,000 training images with batch size 64\n  smaller_is_better: true\nentrypoint: model_def:MNistTrial\nresources:\n  slots_per_trial: 2',
          )}
          files={[
            {
              key: 'test1.yaml',
              title: 'test1.yaml',
            },
          ]}
          readonly={true}
          onError={handleError}
        />
        <strong>Multiple files, one not finished loading.</strong>
        <UncontrolledCodeEditor />
      </AntDCard>
    </ComponentSection>
  );
};

const CodeSampleSection: React.FC = () => {
  return (
    <ComponentSection id="CodeSample">
      <AntDCard>
        <p>
          The <code>CodeSample</code> component contains a block of code (bash, Python, or other)
          which is displayed for the user to view or copy with a <code>ClipboardButton</code>.
          Multi-line text is allowed, but single-line text is not wrapped.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <p>
          The code is passed in the <code>text</code> prop and is not editable by the user.
        </p>
        <CodeSample
          text={
            'det checkpoint download 20cb2c1f-3390-44d2-93a6-f728c594da8c-f728c594da8c-f728c594da8c\npython3 -c "print(\'hello world\')"'
          }
        />
      </AntDCard>
    </ComponentSection>
  );
};

const InlineFormSection: React.FC = () => {
  const [inputWithValidatorValue, setInputWithValidatorValue] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [numberInput, setNumberInput] = useState(1234);
  const [textAreaValue, setTextAreaValue] = useState(loremIpsumSentence);
  const [passwordInputValue, setPasswordInputValue] = useState('123456789');
  const [selectValue, setSelectValue] = useState('off');

  const inputWithValidatorCallback = useCallback((newValue: string) => {
    setInputWithValidatorValue(newValue);
  }, []);
  const numberInputCallback = useCallback((newValue: number) => {
    setNumberInput(newValue);
  }, []);
  const searchCallback = useCallback((newValue: string) => {
    setSearchInput(newValue);
  }, []);
  const textAreaCallback = useCallback((newValue: string) => {
    setTextAreaValue(newValue);
  }, []);
  const passwordInputCallback = useCallback((newValue: string) => {
    setPasswordInputValue(newValue);
  }, []);
  const selectCallback = useCallback((newValue: string) => {
    setSelectValue(newValue === '1' ? 'off' : 'on');
  }, []);

  return (
    <ComponentSection id="InlineForm">
      <AntDCard>
        <p>
          The <code>{'<InlineForm>'}</code> allows people to have a simple form with just one input
          to interact with.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <p>
          If using the <code>{'Input.Password'}</code> component, is important to pass the{' '}
          <code>{'isPassword'}</code> prop.
        </p>
        <br />
        <h5>Controlled</h5>
        <div style={{ maxWidth: '700px' }}>
          <InlineForm<string>
            initialValue={''}
            label="Input with validator"
            rules={[{ message: 'Please input something here!', required: true }]}
            value={inputWithValidatorValue}
            onSubmit={inputWithValidatorCallback}>
            <Input maxLength={32} />
          </InlineForm>
          <hr />
          <InlineForm<string>
            initialValue={textAreaValue}
            label="Text Area"
            value={textAreaValue}
            onSubmit={textAreaCallback}>
            <Input.TextArea />
          </InlineForm>
          <hr />
          <InlineForm<string>
            initialValue={''}
            isPassword
            label="Password"
            value={passwordInputValue}
            onSubmit={passwordInputCallback}>
            <Input.Password />
          </InlineForm>
          <hr />
          <InlineForm<string>
            initialValue={selectValue}
            label="Select"
            value={selectValue}
            onSubmit={selectCallback}>
            <Select defaultValue={1} searchable={false}>
              {[
                { label: 'off', value: 1 },
                { label: 'on', value: 2 },
              ].map((opt) => (
                <Option key={opt.value as React.Key} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </InlineForm>
          <hr />
          <InlineForm<number>
            initialValue={numberInput}
            label="Input Number"
            value={numberInput}
            onSubmit={numberInputCallback}>
            <InputNumber />
          </InlineForm>
          <hr />
          <InlineForm<string>
            initialValue={searchInput}
            label="Input Search"
            value={searchInput}
            onSubmit={searchCallback}>
            <InputSearch allowClear enterButton placeholder="Input Search" />
          </InlineForm>
        </div>
        <h5>Uncontrolled</h5>
        <div style={{ maxWidth: '700px' }}>
          <InlineForm<string>
            initialValue={'initial value'}
            label="Input with validator"
            rules={[{ message: 'Please input something here!', required: true }]}>
            <Input />
          </InlineForm>
          <hr />
          <InlineForm<string> initialValue={textAreaValue} label="Text Area">
            <Input.TextArea />
          </InlineForm>
          <hr />
          <InlineForm<string> initialValue={''} isPassword label="Password">
            <Input.Password />
          </InlineForm>
          <hr />
          <InlineForm<string> initialValue={selectValue} label="Select">
            <Select defaultValue={1} searchable={false}>
              {[
                { label: 'off', value: 1 },
                { label: 'on', value: 2 },
              ].map((opt) => (
                <Option key={opt.value as React.Key} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </InlineForm>
          <hr />
          <InlineForm<number> initialValue={1234} label="Input Number">
            <InputNumber />
          </InlineForm>
          <hr />
          <InlineForm<string> initialValue={''} label="Input Search">
            <InputSearch allowClear enterButton placeholder="Input Search" />
          </InlineForm>
        </div>
      </AntDCard>
    </ComponentSection>
  );
};

const InputSearchSection: React.FC = () => {
  return (
    <ComponentSection id="InputSearch">
      <AntDCard>
        <p>
          A search box (<code>{'<InputSearch>'}</code>) provides an input field for searching
          content within a site or app to find specific items.
        </p>
      </AntDCard>
      <AntDCard title="Best practices">
        <strong>Layout</strong>
        <ul>
          <li>
            Don&apos;t build a custom search control based on the default text box or any other
            control.
          </li>
          <li>
            Use a search box without a parent container when it&apos;s not restricted to a certain
            width to accommodate other content. This search box will span the entire width of the
            space it&apos;s in.
          </li>
        </ul>
        <strong>Content</strong>
        <ul>
          <li>
            Use placeholder text in the search box to describe what people can search for. For
            example, &quot;Search&quot;, &quot;Search files&quot;, or &quot;Search contacts
            list&quot;.
          </li>
          <li>
            Although search entry points tend to be similarly visualized, they can provide access to
            results that range from broad to narrow. By effectively communicating the scope of a
            search, you can ensure that people&apos;s expectations are met by the capabilities of
            the search you&apos;re performing, which will reduce the possibility of frustration. The
            search entry point should be placed near the content being searched.
          </li>
        </ul>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Default Searchbox</strong>
        <InputSearch placeholder="input search text" />
        <strong>Variations</strong>
        <InputSearch allowClear enterButton value="Active search box" />
        <InputSearch disabled placeholder="disabled search box" />
        <hr />
        <strong>In-table Searchbox</strong>
        <p>Not implemented</p>
        <hr />
        <strong>Search box with scopes</strong>
        <p>Not implemented</p>
      </AntDCard>
    </ComponentSection>
  );
};

const InputShortcutSection: React.FC = () => {
  const [value, setValue] = useState<KeyboardShortcut>();
  const onChange = (k: KeyboardShortcut | undefined) => {
    setValue(k);
  };
  return (
    <ComponentSection id="InputShortcut">
      <AntDCard>
        <p>
          An input box (<code>{'<InputShortcut>'}</code>) for keyboard shortcuts.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Default Input for Shortcut</strong>
        <InputShortcut />
        <strong>Controlled Input for Shortcut</strong>
        <InputShortcut value={value} onChange={onChange} />
      </AntDCard>
    </ComponentSection>
  );
};

const InputNumberSection: React.FC = () => {
  return (
    <ComponentSection id="InputNumber">
      <AntDCard>
        <p>
          A spin button (<code>{'<InputNumber>'}</code>) allows someone to incrementally adjust a
          value in small steps. It&apos;s mainly used for numeric values, but other values are
          supported too.
        </p>
      </AntDCard>
      <AntDCard title="Best practices">
        <strong>Layout</strong>
        <ul>
          <li>
            Place labels to the left of the spin button control. For example, &quot;Length of ruler
            (cm)&quot;.
          </li>
          <li>Spin button width should adjust to fit the number values.</li>
        </ul>
        <strong>Content</strong>
        <ul>
          <li>Use a spin button when you need to incrementally change a value.</li>
          <li>Use a spin button when values are tied to a unit of measure.</li>
          <li>Don&apos;t use a spin button for binary settings.</li>
          <li>Don&apos;t use a spin button for a range of three values or less.</li>
        </ul>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Default InputNumber</strong>
        <InputNumber />
        <strong>Disabled InputNumber</strong>
        <InputNumber disabled />
        <hr />
        <span>
          Also see <a href={`#${ComponentTitles.Form}`}>Form</a> for form-specific variations
        </span>
      </AntDCard>
    </ComponentSection>
  );
};

const InputSection: React.FC = () => {
  return (
    <ComponentSection id="Input">
      <AntDCard>
        <p>
          Text fields (<code>{'<Input>'}</code>) give people a way to enter and edit text.
          They&apos;re used in forms, modal dialogs, tables, and other surfaces where text input is
          required.
        </p>
      </AntDCard>
      <AntDCard title="Best practices">
        <strong>Layout</strong>
        <ul>
          <li>Use a multiline text field when long entries are expected.</li>
          <li>
            Don&apos;t place a text field in the middle of a sentence, because the sentence
            structure might not make sense in all languages. For example, &quot;Remind me in
            [textfield] weeks&quot; should instead read, &quot;Remind me in this many weeks:
            [textfield]&quot;.
          </li>
          <li>Format the text field for the expected entry.</li>
        </ul>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>
          Input <code>{'<Input>'}</code>
        </strong>
        <strong>Default Input</strong>
        <Input />
        <strong>Disabled Input</strong>
        <Input disabled />
        <hr />
        <strong>
          TextArea <code>{'<Input.TextArea>'}</code>
        </strong>
        <strong>Default TextArea</strong>
        <Input.TextArea />
        <strong>Disabled TextArea</strong>
        <Input.TextArea disabled />
        <hr />
        <strong>
          Password <code>{'<Input.Password>'}</code>
        </strong>
        <strong>Default Password</strong>
        <Input.Password />
        <strong>Disabled Password</strong>
        <Input.Password disabled />
        <hr />
        <span>
          Also see <a href={`#${ComponentTitles.Form}`}>Form</a> for form-specific variations
        </span>
      </AntDCard>
    </ComponentSection>
  );
};

const DatePickerSection: React.FC = () => {
  return (
    <ComponentSection id="DatePicker">
      <AntDCard>
        <p>
          <code>DatePicker</code> is a form element for the user to select a specific time, date, or
          month from a calendar UI. When using <code>onChange</code>, the returned value is a{' '}
          <code>Dayjs</code> object. The component accepts a subset of the props for the{' '}
          <code>Antd.DatePicker</code>, with the <code>style</code> prop replaced by our usage (
          <code>width</code>).
        </p>
        <p>
          The <code>picker</code> prop can be set to select a month. Alternatively the{' '}
          <code>showTime</code> prop adds precision to the second.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        DatePickers with labels:
        <strong>Date-time picker</strong>
        <DatePicker label="Choose a date and time" showTime onChange={noOp} />
        <strong>Clearable day picker</strong>
        <DatePicker label="Choose a date" onChange={noOp} />
        <hr />
        <strong>Un-clearable month picker, without a label</strong>
        <DatePicker allowClear={false} picker="month" onChange={noOp} />
      </AntDCard>
    </ComponentSection>
  );
};

const BreadcrumbsSection: React.FC = () => {
  const menuItems: MenuItem[] = [
    { key: 'Action 1', label: 'Action 1' },
    { key: 'Action 2', label: 'Action 2' },
  ];

  return (
    <ComponentSection id="Breadcrumbs">
      <AntDCard>
        <p>
          <code>{'<Breadcrumb>'}</code>s should be used as a navigational aid in your app or site.
          They indicate the current page&apos;s location within a hierarchy and help the user
          understand where they are in relation to the rest of that hierarchy. They also afford
          one-click access to higher levels of that hierarchy.
        </p>
        <p>
          Breadcrumbs are typically placed, in horizontal form, under the masthead or navigation of
          an experience, above the primary content area.
        </p>
      </AntDCard>
      <AntDCard title="Best practices">
        <strong>Accessibility</strong>
        <ul>
          <li>By default, Breadcrumb uses arrow keys to cycle through each item. </li>
          <li>
            Place Breadcrumbs at the top of a page, above a list of items, or above the main content
            of a page.
          </li>
        </ul>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Breadcrumb</strong>
        <Breadcrumb>
          <Breadcrumb.Item>Level 0</Breadcrumb.Item>
          <Breadcrumb.Item>Level 1</Breadcrumb.Item>
          <Breadcrumb.Item>Level 2</Breadcrumb.Item>
        </Breadcrumb>
        <strong>Breadcrumb with actions</strong>
        <Breadcrumb menuItems={menuItems}>
          <Breadcrumb.Item>Level 0</Breadcrumb.Item>
          <Breadcrumb.Item>Level 1</Breadcrumb.Item>
        </Breadcrumb>
      </AntDCard>
    </ComponentSection>
  );
};

const useRichTextEditorDemo = (): JSX.Element => {
  const [doc, setDoc] = useState<Document>({ contents: '', name: 'Untitled' });
  const onSave = (n: Document) => Promise.resolve(setDoc(n));
  const { openToast } = useToast();
  const handleError = () =>
    openToast({
      description: 'Something bad happened!',
      severity: 'Error',
      title: 'Error',
    });
  return <RichTextEditor docs={doc} onError={handleError} onSave={onSave} />;
};

const useRichTextEditorsDemo = (): JSX.Element => {
  const [docs, setNotes] = useState<Document[]>([]);
  const onDelete = (p: number) => setNotes((n) => n.filter((_, idx) => idx !== p));
  const onNewPage = () => setNotes((n) => [...n, { contents: '', name: 'Untitled' }]);
  const { openToast } = useToast();
  const handleError = () =>
    openToast({
      description: 'Something bad happened!',
      severity: 'Error',
      title: 'Error',
    });
  const onSave = (n: Document[]) => Promise.resolve(setNotes(n));
  return (
    <RichTextEditor
      docs={docs}
      multiple
      onDelete={onDelete}
      onError={handleError}
      onNewPage={onNewPage}
      onSave={onSave}
    />
  );
};

const RichTextEditorSection: React.FC = () => {
  return (
    <ComponentSection id="RichTextEditor">
      <AntDCard>
        <p>
          A <code>{'<RichTextEditor>'}</code> is used for creating rich text documents. It can be
          single page documents or multi pages documents. Each page of document consists of a title
          and a sheet of document.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Single page document</strong>
        {useRichTextEditorDemo()}
        <hr />
        <strong>Multi pages documents</strong>
        {useRichTextEditorsDemo()}
      </AntDCard>
    </ComponentSection>
  );
};

const AvatarSection: React.FC = () => {
  return (
    <ComponentSection id="Avatar">
      <AntDCard>
        <p>
          An avatar (<code>{'<Avatar>'}</code>) is a compact information display. The information is
          abbreviated with an option to hover for an unabbreviated view.
        </p>
      </AntDCard>
      <AntDCard title="Variations">
        <strong>Sizes</strong>
        ExtraSmall
        <Avatar size={AvatarSize.ExtraSmall} text="Test User" />
        Small (Default Size)
        <Avatar size={AvatarSize.Small} text="Test User" />
        Medium
        <Avatar size={AvatarSize.Medium} text="Test User" />
        Large
        <Avatar size={AvatarSize.Large} text="Test User" />
        ExtraLarge
        <Avatar size={AvatarSize.ExtraLarge} text="Test User" />
        <strong>Shape</strong>
        Square
        <Avatar square text="Test User" />
        <strong>Color</strong>
        Muted palette
        <Avatar palette="muted" text="Test User" />
        No Color
        <Avatar noColor text="Test User" />
        Inactive
        <Avatar inactive text="Test User" />
        <strong>Tooltip</strong>
        Custom tooltip text
        <Avatar text="Test User" tooltipText="Custom tooltip text" />
        Hide tooltip
        <Avatar hideTooltip text="Test User" />
      </AntDCard>
      <AntDCard title="Group">
        <AvatarGroup items={['Test User', 'Sample Person', 'Example Individual']} />
      </AntDCard>
    </ComponentSection>
  );
};

const SurfaceSection: React.FC = () => {
  const elevations: ElevationLevels[] = [0, 1, 2, 3, 4];
  return (
    <ComponentSection id="Surface">
      <AntDCard>
        <p>
          A surface (<code>{'<Surface>'}</code>) is a container with an elevation and an optional
          hover state. By default a surface will be one elevation level higher than the surface it
          sits on, though this can be overridden.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Default surfaces</strong>
        <Space>
          {elevations.map((elevation) => (
            <Surface elevationOverride={elevation} key={elevation}>
              <Tooltip content={`Elevation ${elevation}`}>
                <div style={{ padding: 25 }} />
              </Tooltip>
            </Surface>
          ))}
        </Space>
        <strong>Surfaces with hover state</strong>
        <Space>
          {elevations.map((elevation) => (
            <Surface elevationOverride={elevation} hover key={elevation}>
              <Tooltip content={`Elevation ${elevation}`}>
                <div style={{ padding: 25 }} />
              </Tooltip>
            </Surface>
          ))}
        </Space>
        <strong>Nested surfaces increase elevation</strong>
        <Surface>
          <Surface>
            <Surface>
              <Surface />
            </Surface>
          </Surface>
        </Surface>
      </AntDCard>
    </ComponentSection>
  );
};

const ResponsiveGroupSection: React.FC = () => {
  const [numChildren, setNumChildren] = useState(2);
  const [numVisible, setNumVisible] = useState<number[]>(Array(2).fill(2));
  const mappingArray = new Array(numChildren).fill(undefined);

  const onChildVisibilityChange = (numVisible: number, exampleIndex: number) =>
    setNumVisible((prev) => prev.with(exampleIndex, numVisible));

  return (
    <ComponentSection id="ResponsiveGroup">
      <AntDCard>
        <p>
          A responsive group (<code>{'<ResponsiveGroup>'}</code>) is a container that can
          responsively show and hide children as its size changes. The user can set the maximum
          number of visible children. The gap between items can be small, medium, or large.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <Button onClick={() => setNumChildren((prev) => prev + 1)}>Add element</Button>
        <Button onClick={() => setNumChildren((prev) => Math.max(prev - 1, 0))}>
          Remove element
        </Button>
        <p>Total number of elements: {numChildren}</p>
        <hr />
        <strong>
          <code>maxVisible</code> 3 (default)
        </strong>
        <p>Number of hidden elements: {numChildren - numVisible[0]}</p>
        <div style={{ minHeight: 70, overflow: 'hidden', resize: 'horizontal', width: 300 }}>
          <ResponsiveGroup onChange={(val) => onChildVisibilityChange(val, 0)}>
            {mappingArray.map((_, i) => (
              <Surface key={i}>
                <div style={{ padding: 25 }} />
              </Surface>
            ))}
          </ResponsiveGroup>
        </div>
        <strong>
          <code>maxVisible</code> 6
        </strong>
        <p>Number of hidden elements: {numChildren - numVisible[1]}</p>
        <div style={{ minHeight: 70, overflow: 'hidden', resize: 'horizontal', width: 300 }}>
          <ResponsiveGroup maxVisible={6} onChange={(val) => onChildVisibilityChange(val, 1)}>
            {mappingArray.map((_, i) => (
              <Surface key={i}>
                <div style={{ padding: 25 }} />
              </Surface>
            ))}
          </ResponsiveGroup>
        </div>
        <hr />
        <strong>Small gap</strong>
        <div style={{ minHeight: 70 }}>
          <ResponsiveGroup gap="small" onChange={(val) => onChildVisibilityChange(val, 0)}>
            {mappingArray.map((_, i) => (
              <Surface key={i}>
                <div style={{ padding: 25 }} />
              </Surface>
            ))}
          </ResponsiveGroup>
        </div>
        <strong>Medium gap (default)</strong>
        <div style={{ minHeight: 70 }}>
          <ResponsiveGroup onChange={(val) => onChildVisibilityChange(val, 0)}>
            {mappingArray.map((_, i) => (
              <Surface key={i}>
                <div style={{ padding: 25 }} />
              </Surface>
            ))}
          </ResponsiveGroup>
        </div>
        <strong>Large gap</strong>
        <div style={{ minHeight: 70 }}>
          <ResponsiveGroup gap="large" onChange={(val) => onChildVisibilityChange(val, 0)}>
            {mappingArray.map((_, i) => (
              <Surface key={i}>
                <div style={{ padding: 25 }} />
              </Surface>
            ))}
          </ResponsiveGroup>
        </div>
      </AntDCard>
    </ComponentSection>
  );
};

const NameplateSection: React.FC = () => {
  const testUser = { displayName: 'Test User', id: 1, username: 'testUser123' } as const;

  return (
    <ComponentSection id="Nameplate">
      <AntDCard>
        <p>
          A (<code>{'<Nameplate>'}</code>) displays an icon, a name, and an optional alias. The icon
          is displayed on the left, and the text fields are displayed on the right. If an alias is
          provided, it is displayed above the name in larger font. A &apos;compact&apos; option
          reduces the size of the name for use in a smaller form or modal.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <li>With name and alias</li>
        <Nameplate
          alias={testUser.displayName}
          icon={<Avatar text={testUser.displayName} />}
          name={testUser.username}
        />
        <li>Compact format</li>
        <Nameplate
          alias={testUser.displayName}
          compact
          icon={<Avatar text={testUser.displayName} />}
          name={testUser.username}
        />
        <li>No alias</li>
        <Nameplate icon={<Icon name="group" title="Group" />} name="testGroup123" />
        <li>Compact, no alias</li>
        <Nameplate compact icon={<Icon name="group" title="Group" />} name="testGroup123" />
      </AntDCard>
    </ComponentSection>
  );
};

const PivotSection: React.FC = () => {
  const [activeKey, setActiveKey] = useState('profiler');
  const onChangeTab = useCallback((key: string) => setActiveKey(key), []);

  return (
    <ComponentSection id="Pivot">
      <AntDCard>
        <p>
          The Pivot control (<code>{'<Tabs>'}</code>) and related tabs pattern are used for
          navigating frequently accessed, distinct content categories. Pivots allow for navigation
          between two or more content views and relies on text headers to articulate the different
          sections of content.
        </p>
        <p>Tapping on a pivot item header navigates to that header&apos;s section content.</p>
        <p>
          Tabs are a visual variant of Pivot that use a combination of icons and text or just icons
          to articulate section content.
        </p>
      </AntDCard>
      <AntDCard title="Best practices">
        <strong>Content considerations</strong>
        <ul>
          <li>
            Be concise on the navigation labels, ideally one or two words rather than a phrase.
          </li>
          <li>
            Use on content-heavy pages that require a significant amount of scrolling to access the
            various sections.
          </li>
        </ul>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Primary Pivot</strong>
        <div>
          <Pivot
            activeKey={activeKey}
            items={[
              { children: 'Overview', key: 'overview', label: 'Overview' },
              { children: 'Hyperparameters', key: 'hyperparameters', label: 'Hyperparameters' },
              { children: 'Checkpoints', key: 'checkpoints', label: 'Checkpoints' },
              { children: 'Code', key: 'code', label: 'Code' },
              { children: 'Notes', key: 'notes', label: 'Notes' },
              { children: 'Profiler', key: 'profiler', label: 'Profiler' },
              { children: 'Logs', key: 'logs', label: 'Logs' },
            ]}
            tabBarExtraContent={<Button>Hyperparameter Search</Button>}
            onChange={onChangeTab}
          />
        </div>
        <br />
        <hr />
        <br />
        <strong>Secondary Pivot</strong>
        <Column>
          <Pivot
            activeKey={activeKey}
            items={[
              { children: 'Overview', key: 'overview', label: 'Overview' },
              { children: 'Hyperparameters', key: 'hyperparameters', label: 'Hyperparameters' },
              { children: 'Checkpoints', key: 'checkpoints', label: 'Checkpoints' },
              { children: 'Code', key: 'code', label: 'Code' },
              { children: 'Notes', key: 'notes', label: 'Notes' },
              { children: 'Profiler', key: 'profiler', label: 'Profiler' },
              { children: 'Logs', key: 'logs', label: 'Logs' },
            ]}
            type="secondary"
            onChange={onChangeTab}
          />
          <p>The active tab and body have elevation applied.</p>
          <Surface>
            <Pivot
              items={[
                { children: 'Overview', key: 'Overview', label: 'Overview' },
                { children: 'Hyperparameters', key: 'hyperparameters', label: 'Hyperparameters' },
                { children: 'Checkpoints', key: 'checkpoints', label: 'Checkpoints' },
                { children: 'Code', key: 'code', label: 'Code' },
                { children: 'Notes', key: 'notes', label: 'Notes' },
                { children: 'Profiler', key: 'profiler', label: 'Profiler' },
                { children: 'Logs', key: 'logs', label: 'Logs' },
              ]}
              type="secondary"
            />
          </Surface>
        </Column>
      </AntDCard>
    </ComponentSection>
  );
};

const ProgressSection: React.FC = () => {
  return (
    <ComponentSection id="Progress">
      <AntDCard>
        <p>
          The Progress control (<code>{'<Progress>'}</code>) displays multiple colorful areas adding
          up to 100% progress.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <p>
          Each progress bar part has a required CSS <code>color</code> and a <code>percent</code>{' '}
          value (from 0.0 to 1.0).
        </p>
        <strong>Single progress bar section up to 50%</strong>
        <Progress parts={[{ color: '#009BDE', percent: 0.5 }]} />
        <br />
        <p>
          Adding the <code>flat</code> prop displays the progress bar with square corners and no
          drop shadow.
        </p>
        <strong>Flat variant</strong>
        <Progress
          flat
          parts={[
            { color: '#f00', percent: 0.5 },
            { color: '#009BDE', percent: 0.25 },
          ]}
        />
      </AntDCard>
      <AntDCard title="Exterior components">
        <p>
          A <code>title</code> prop is displayed centered above the progress bar:
        </p>
        <strong>Progress bar with title</strong>
        <Progress
          parts={[
            { color: '#009BDE', label: 'Plan A', percent: 0.5 },
            { color: '#f00', label: 'Plan C', percent: 0.2 },
          ]}
          title="Shareholder Votes"
        />
        <br />
        <p>
          Each progress bar part can have an optional <code>label</code> value. With the prop{' '}
          <code>showTooltips</code>, each bar part will have an individual tooltip.
        </p>
        <strong>Progress bar with tooltip labels</strong>
        <Progress
          flat
          parts={[
            { color: '#f00', label: 'Plan A', percent: 0.5 },
            { color: '#009BDE', label: 'Plan C', percent: 0.25 },
          ]}
          showTooltips
        />
        <br />
        <p>
          With the <code>showLegend</code> prop, labels are displayed in a legend below the progress
          bar. Labels are exactly as sent (i.e. the percentages below are set in the label field).
        </p>
        <strong>Progress bar with legend</strong>
        <Progress
          parts={[
            { color: '#009BDE', label: 'Apples (50.0%)', percent: 0.5 },
            { color: 'orange', label: 'Oranges (25.3%)', percent: 0.2525252 },
          ]}
          showLegend
        />
      </AntDCard>
    </ComponentSection>
  );
};

const PaginationSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageSize, setCurrentPageSize] = useState<number>(1);

  return (
    <ComponentSection id="Pagination">
      <AntDCard>
        <p>
          <code>{'<Pagination>'}</code> is the process of splitting the contents of a website, or
          section of contents from a website, into discrete pages. This user interface design
          pattern is used so users are not overwhelmed by a mass of data on one page. Page breaks
          are automatically set.
        </p>
      </AntDCard>
      <AntDCard title="Best practices">
        <strong>Content considerations</strong>
        <ul>
          <li>Use ordinal numerals or letters of the alphabet.</li>
          <li>
            Indentify the current page in addition to the pages in immediate context/surrounding.
          </li>
        </ul>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Pagination default</strong>
        <Pagination
          current={currentPage}
          pageSize={currentPageSize}
          total={500}
          onChange={(page: number, pageSize: number) => {
            setCurrentPage(page);
            setCurrentPageSize(pageSize);
          }}
        />
        <strong>Considerations</strong>
        <ul>
          <li>
            Always give the user the option to navigate to the first & last page -- this helps with
            sorts.
          </li>
          <li>
            Provide the user with 2 pages before/after when navigating &apos;island&apos;
            page-counts.
          </li>
          <li>Provide the user with the first 4 or last 4 pages of the page-range.</li>
          <li>
            Ensure the FocusTrap is set to the whole pagination component so that user doesn&apos;t
            tabs in/out accidentally.
          </li>
        </ul>
      </AntDCard>
    </ComponentSection>
  );
};

const CardsSection: React.FC = () => {
  return (
    <ComponentSection id="Cards">
      <AntDCard>
        <p>
          A Card (<code>{'<Card>'}</code>) contains additional metadata or actions. This offers
          people a richer view into a file than the typical grid view.
        </p>
      </AntDCard>
      <AntDCard title="Best practices">
        <strong>Content considerations</strong>
        <ul>
          <li>Incorporate metadata that is relevant and useful in this particular view.</li>
          <li>
            Don&apos;t use a document card in views where someone is likely to be performing bulk
            operations in files, or when the list may get very long. Specifically, if you&apos;re
            showing all the items inside an actual folder, a card may be overkill because the
            majority of the items in the folder may not have interesting metadata.
          </li>
          <li>
            Don&apos;t use a document card if space is at a premium or you can&apos;t show relevant
            and timely commands or metadata. Cards are useful because they can expose on-item
            interactions like “Share” buttons or view counts.
          </li>
        </ul>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Card default</strong>
        <Card />
        <strong>Card group default</strong>
        <p>
          A card group (<code>{'<Card.Group>'}</code>) can be used to display a list or grid of
          cards.
        </p>
        <Card.Group>
          <Card />
        </Card.Group>
        <strong>Considerations</strong>
        <ul>
          <li>Ensure links are tab-able.</li>
          <li>Ensure data is relevant and if not, remove it.</li>
          <li>We need to revisit the density of each of the cards and content.</li>
          <li>
            Implement quick actions inside of the card as to prevent the user from providing
            additional clicks.
          </li>
        </ul>
        <strong>Card variations</strong>
        <p>Small cards (default)</p>
        <Card.Group>
          <Card actionMenu={[{ key: 'test', label: 'Test' }]}>Card with actions</Card>
          <Card actionMenu={[{ key: 'test', label: 'Test' }]} disabled>
            Disabled card
          </Card>
          <Card onClick={noOp}>Clickable card</Card>
        </Card.Group>
        <p>Medium cards</p>
        <Card.Group size="medium">
          <Card actionMenu={[{ key: 'test', label: 'Test' }]} size="medium">
            Card with actions
          </Card>
          <Card actionMenu={[{ key: 'test', label: 'Test' }]} disabled size="medium">
            Disabled card
          </Card>
          <Card size="medium" onClick={noOp}>
            Clickable card
          </Card>
        </Card.Group>
        <strong>Card group variations</strong>
        <p>Wrapping group (default)</p>
        <Card.Group size="medium">
          <Card size="medium" />
          <Card size="medium" />
          <Card size="medium" />
          <Card size="medium" />
          <Card size="medium" />
          <Card size="medium" />
          <Card size="medium" />
        </Card.Group>
        <p>Non-wrapping group</p>
        <Card.Group size="medium" wrap={false}>
          <Card size="medium" />
          <Card size="medium" />
          <Card size="medium" />
          <Card size="medium" />
          <Card size="medium" />
          <Card size="medium" />
          <Card size="medium" />
        </Card.Group>
      </AntDCard>
    </ComponentSection>
  );
};

const CollectionSection = () => {
  const surfacesShort = useMemo(() => {
    const surfaceArray = [];
    for (let i = 0; i < 3; i++) {
      surfaceArray.push(
        <Surface key={i}>
          <div style={{ height: 100 }} />
        </Surface>,
      );
    }
    return surfaceArray;
  }, []);
  const surfacesLong = useMemo(() => {
    const surfaceArray = [];
    for (let i = 0; i < 6; i++) {
      surfaceArray.push(
        <Surface key={i}>
          <div style={{ height: 100 }} />
        </Surface>,
      );
    }
    return surfaceArray;
  }, []);
  return (
    <ComponentSection id="Collection">
      <AntDCard>
        <p>
          A Collection (<code>{'<Collection>'}</code>) is a two-dimensional grid system that can be
          used to lay out major page areas or small user interface elements. The gap between items
          in a collection can be small, medium, or large.
        </p>
      </AntDCard>
      <AntDCard title="Gaps">
        <strong>Small Gap</strong>
        <Collection gap={ShirtSize.Small}>{surfacesShort}</Collection>
        <strong>Medium Gap (default)</strong>
        <Collection gap={ShirtSize.Medium}>{surfacesShort}</Collection>
        <strong>Large Gap</strong>
        <Collection gap={ShirtSize.Large}>{surfacesShort}</Collection>
      </AntDCard>
      <AntDCard title="Modes">
        <strong>Auto-Fit (default)</strong>
        <Collection mode={LayoutMode.AutoFit}>{surfacesShort}</Collection>
        <strong>Auto-Fill</strong>
        <Collection mode={LayoutMode.AutoFill}>{surfacesShort}</Collection>
        <strong>Scrollable Row</strong>
        <Collection mode={LayoutMode.ScrollableRow}>{surfacesLong}</Collection>
      </AntDCard>
    </ComponentSection>
  );
};

const serverAddress = () => 'http://latest-main.determined.ai:8080/det';
const LogViewerSection: React.FC = () => {
  const { openToast } = useToast();
  const handleError = () =>
    openToast({
      description: 'Something bad happened!',
      severity: 'Error',
      title: 'Error',
    });
  const sampleLogs = [
    {
      id: 1,
      level: LogLevel.Info,
      message: 'Determined master 0.19.7-dev0 (built with go1.18.7)',
      time: '2022-06-02T21:48:07.456381-06:00',
    },
    {
      id: 2,
      level: LogLevel.Info,
      message:
        'connecting to database determined-master-database-tytmqsutj5d1.cluster-csrkoc1nkoog.us-west-2.rds.amazonaws.com:5432',
      time: '2022-07-02T21:48:07.456381-06:00',
    },
    {
      id: 3,
      level: LogLevel.Info,
      message:
        'running DB migrations from file:///usr/share/determined/master/static/migrations; this might take a while...',
      time: '2022-08-02T21:48:07.456381-06:00',
    },
    {
      id: 4,
      level: LogLevel.Info,
      message: 'no migrations to apply; version: 20221026124235',
      time: '2022-09-02T21:48:07.456381-06:00',
    },
    {
      id: 5,
      level: LogLevel.Error,
      message:
        'failed to aggregate resource allocation: failed to add aggregate allocation: ERROR: range lower bound must be less than or equal to range upper bound (SQLSTATE 22000)  actor-local-addr="allocation-aggregator" actor-system="master" go-type="allocationAggregator"',
      time: '2022-10-02T21:48:07.456381-06:00',
    },
    {
      id: 6,
      level: LogLevel.Warning,
      message:
        'received update on unknown agent  actor-local-addr="aux-pool" actor-system="master" agent-id="i-018fadb36ddbfe97a" go-type="ResourcePool" resource-pool="aux-pool"',
      time: '2022-11-02T21:48:07.456381-06:00',
    },
  ];
  return (
    <ComponentSection id="LogViewer">
      <AntDCard>
        <p>
          A Logview (<code>{'<LogViewer>'}</code>) prints events that have been configured to be
          triggered and return them to the user in a running stream.
        </p>
      </AntDCard>
      <AntDCard title="Best practices">
        <strong>Content considerations</strong>
        <ul>
          <li>
            Prioritize accessibility and readability of the log entry as details can always be
            generated afterwards.
          </li>
          <li>
            Prioritize IntelliSense type of readability improvements as it helps scannability of the
            text.
          </li>
          <li>Provide the user with ways of searching & filtering down logs.</li>
        </ul>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>LogViewer default</strong>
        <div>
          <LogViewer
            decoder={(l) => l as Log}
            initialLogs={sampleLogs}
            serverAddress={serverAddress}
            sortKey="id"
            onError={handleError}
          />
        </div>
        <strong>Considerations</strong>
        <ul>
          <li>
            Ensure that we don&apos;t overload the users with information --&gt; we need to know
            what events we&apos;re listening to.
          </li>
          <li>Ensure the capability of searching/filtering log entries.</li>
        </ul>
      </AntDCard>
    </ComponentSection>
  );
};

const FormSection: React.FC = () => {
  return (
    <ComponentSection id="Form">
      <AntDCard>
        <p>
          <code>{'<Form>'}</code> and <code>{'<Form.Item>'}</code> components are used for
          submitting user input. When these components wrap a user input field (such as{' '}
          <code>{'<Input>'}</code> or <code>{'<Select>'}</code>), they can show a standard label,
          indicate that the field is required, apply input validation, or display an input
          validation error.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <Form>
          <strong>
            Form-specific <a href={ComponentTitles.Input}>Input</a> variations
          </strong>
          <br />
          <Form.Item label="Required input" name="required_input" required>
            <Input />
          </Form.Item>
          <Form.Item
            label="Invalid input"
            name="invalid_input"
            validateMessage="Input validation error"
            validateStatus="error">
            <Input />
          </Form.Item>
          <br />
          <hr />
          <br />
          <strong>
            Form-specific <a href={ComponentTitles.Input}>TextArea</a> variations
          </strong>
          <br />
          <Form.Item label="Required TextArea" name="required_textarea" required>
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Invalid TextArea"
            name="invalid_textarea"
            validateMessage="Input validation error"
            validateStatus="error">
            <Input.TextArea />
          </Form.Item>
          <br />
          <hr />
          <br />
          <strong>
            Form-specific <a href={ComponentTitles.Input}>Password</a> variations
          </strong>
          <br />
          <Form.Item label="Required Password" name="required_label" required>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Invalid Password"
            name="invalid_password"
            validateMessage="Input validation error"
            validateStatus="error">
            <Input.Password />
          </Form.Item>
          <br />
          <hr />
          <br />
          <strong>
            Form-specific <a href={ComponentTitles.Input}>InputNumber</a> variations
          </strong>
          <Form.Item label="Required InputNumber" name="number" required>
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Invalid InputNumber"
            validateMessage="Input validation error"
            validateStatus="error">
            <InputNumber />
          </Form.Item>
          <br />
          <hr />
          <br />
          <strong>
            Form-specific <a href={ComponentTitles.Select}>Select</a> variations
          </strong>
          <Form.Item initialValue={1} label="Required dropdown" name="required_dropdown" required>
            <Select
              options={[
                { label: 'Option 1', value: 1 },
                { label: 'Option 2', value: 2 },
                { label: 'Option 3', value: 3 },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Invalid dropdown"
            validateMessage="Input validation error"
            validateStatus="error">
            <Select />
          </Form.Item>
        </Form>
      </AntDCard>
    </ComponentSection>
  );
};

const TagsSection: React.FC = () => {
  const tags: string[] = ['working', 'TODO'];
  const moreTags: string[] = ['working', 'TODO', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5'];
  return (
    <ComponentSection id="Tags">
      <AntDCard>
        <p>
          The editable tags list (<code>{'<Tags>'}</code>) supports &quot;add&quot;,
          &quot;edit&quot; and &quot;remove&quot; actions on individual tags.
        </p>
      </AntDCard>
      <AntDCard title="Best practices">
        <strong>Content</strong>
        <ul>
          <li>Don&apos;t use tags of the same content within one list.</li>
          <li>Tags are ordered alphabetically.</li>
          <li>Individual tags cannot be empty.</li>
        </ul>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Tags default</strong>
        <Space>{useTags([...tags])()}</Space>
        <strong>Tags ghost</strong>
        <Space>{useTags([...tags])({ ghost: true })}</Space>
        <strong>Tags disabled</strong>
        <Space>{useTags([...tags])({ disabled: true })}</Space>
        <strong>Tags compact</strong>
        <Space>{useTags([...moreTags])({ compact: true })}</Space>
        <strong>Tags with long text</strong>
        <Space>
          {useTags([
            'very very very long text, very very very long text, very very very long text, very very very long text.',
          ])()}
        </Space>
      </AntDCard>
    </ComponentSection>
  );
};

const TypographySection: React.FC = () => {
  return (
    <ComponentSection id="Typography">
      <AntDCard title="Usage">
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px' }}>
            <strong>Title</strong>
            <Title size={TypographySize.L}>Large Title</Title>
            <Title>Default Title</Title>
            <Title size={TypographySize.S}>Small Title</Title>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px' }}>
            <strong>Body</strong>
            <br />
            <Body size={TypographySize.L}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut suscipit itaque debitis
              amet, eligendi possimus assumenda eos, iusto ea labore, officia aspernatur optio. In
              necessitatibus porro ut vero commodi neque. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Voluptatibus, omnis quo dolorem magnam dolores necessitatibus iure
              illo incidunt maiores voluptas odit eligendi dignissimos facilis vel veniam id.
              Obcaecati, cum eos. (Large)
            </Body>
            <br />
            <Body>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut suscipit itaque debitis
              amet, eligendi possimus assumenda eos, iusto ea labore, officia aspernatur optio. In
              necessitatibus porro ut vero commodi neque. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Voluptatibus, omnis quo dolorem magnam dolores necessitatibus iure
              illo incidunt maiores voluptas odit eligendi dignissimos facilis vel veniam id.
              Obcaecati, cum eos. (Default)
            </Body>
            <br />
            <Body size={TypographySize.S}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut suscipit itaque debitis
              amet, eligendi possimus assumenda eos, iusto ea labore, officia aspernatur optio. In
              necessitatibus porro ut vero commodi neque. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Voluptatibus, omnis quo dolorem magnam dolores necessitatibus iure
              illo incidunt maiores voluptas odit eligendi dignissimos facilis vel veniam id.
              Obcaecati, cum eos. (Small)
            </Body>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px' }}>
            <strong>Label</strong>
            <Label size={TypographySize.L}>Large Label</Label>
            <Label>Default Label</Label>
            <Label size={TypographySize.S}>Small Label</Label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px' }}>
            <strong>Code</strong>
            <Code>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut suscipit itaque debitis
              amet, eligendi possimus assumenda eos, iusto ea labore, officia aspernatur optio. In
              necessitatibus porro ut vero commodi neque. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Voluptatibus, omnis quo dolorem magnam dolores necessitatibus iure
              illo incidunt maiores voluptas odit eligendi dignissimos facilis vel veniam id.
              Obcaecati, cum eos. (Default)
            </Code>
            <br />
          </div>
        </div>
      </AntDCard>
      <AntDCard title="Truncation">
        Truncated to 2 rows, no tooltip:
        <div style={{ width: 400 }}>
          <Body truncate={{ rows: 2 }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut suscipit itaque debitis
            amet, eligendi possimus assumenda eos, iusto ea labore, officia aspernatur optio. In
            necessitatibus porro ut vero commodi neque. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptatibus, omnis quo dolorem magnam dolores necessitatibus iure
            illo incidunt maiores voluptas odit eligendi dignissimos facilis vel veniam id.
            Obcaecati, cum eos.
          </Body>
        </div>
        Truncated to 2 rows, with a tooltip containing full text:
        <div style={{ width: 400 }}>
          <Body truncate={{ rows: 2, tooltip: true }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut suscipit itaque debitis
            amet, eligendi possimus assumenda eos, iusto ea labore, officia aspernatur optio. In
            necessitatibus porro ut vero commodi neque. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptatibus, omnis quo dolorem magnam dolores necessitatibus iure
            illo incidunt maiores voluptas odit eligendi dignissimos facilis vel veniam id.
            Obcaecati, cum eos.
          </Body>
        </div>
        Truncated to 2 rows, with custom tooltip:
        <div style={{ width: 400 }}>
          <Body truncate={{ rows: 2, tooltip: <strong>Custom tooltip</strong> }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut suscipit itaque debitis
            amet, eligendi possimus assumenda eos, iusto ea labore, officia aspernatur optio. In
            necessitatibus porro ut vero commodi neque. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptatibus, omnis quo dolorem magnam dolores necessitatibus iure
            illo incidunt maiores voluptas odit eligendi dignissimos facilis vel veniam id.
            Obcaecati, cum eos.
          </Body>
        </div>
      </AntDCard>
    </ComponentSection>
  );
};

const ColorSection: React.FC = () => {
  const themeStatus = Object.values(Status);
  const backgrounds = Object.values(Background);
  const stage = Object.values(Stage);
  const surface = Object.values(SurfaceColor);
  const float = Object.values(Float);
  const overlay = Object.values(Overlay);
  const brand = Object.values(Brand);
  const interactive = Object.values(Interactive);

  const renderColorComponent = (colorArray: string[], name: string) => (
    <AntDCard key={name.toLowerCase()} title={`${name} Colors`}>
      <Collection>
        {colorArray.map((cName, idx) => (
          <div
            key={`${idx}-${name.toLowerCase()}`}
            style={{
              marginBottom: '20px',
              width: '250px',
            }}>
            <span>{cName.replace(/(var\(|\))/g, '')}</span>
            <div
              style={{
                backgroundColor: cName,
                border: 'var(--theme-stroke-width) solid var(--theme-surface-border)',
                borderRadius: 'var(--theme-border-radius)',
                height: '40px',
                width: '100%',
              }}
            />
          </div>
        ))}
      </Collection>
    </AntDCard>
  );
  const iterateOverThemes = (themes: Array<string[]>, names: string[]) =>
    themes.map((theme, idx) => renderColorComponent(theme, names[idx]));

  return (
    <ComponentSection id="Color">
      <AntDCard>
        <p>
          We have a variety of colors that are available for use with the components in the UI Kit.
        </p>
      </AntDCard>
      {iterateOverThemes(
        [themeStatus, backgrounds, stage, surface, float, overlay, brand, interactive],
        ['Status', 'Background', 'Stage', 'Surface', 'Float', 'Overlay', 'Brand', 'Interactive'],
      )}
    </ComponentSection>
  );
};

const BadgeSection: React.FC = () => {
  return (
    <ComponentSection id="Badges">
      <AntDCard>
        <p>
          <code>{'<Badge>'}</code> is a short piece of information or status descriptor for UI
          elements.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Default Usage</strong>
        <Space>
          <Badge text="content" />
        </Space>
        <strong>Status Badge Variation</strong>
        <Space>
          <Badge backgroundColor={hex2hsl('#FAFAFA')} dashed={true} text="POTENTIAL" />
          <Badge backgroundColor={hex2hsl('#6666CC')} text="PULLING IMAGE" />
          <Badge backgroundColor={hex2hsl('#009DE0')} text="RUNNING" />
          <Badge backgroundColor={hex2hsl('#267326')} text="COMPLETED" />
          <Badge backgroundColor={hex2hsl('#CC0000')} text="DELETING" />
        </Space>
      </AntDCard>
    </ComponentSection>
  );
};

const TooltipsSection: React.FC = () => {
  const text = 'Tooltip text';
  const buttonWidth = 70;

  return (
    <ComponentSection id="Tooltips">
      <AntDCard>
        <p>
          A (<code>{'<Tooltip>'}</code>) is used to display a string value, and is triggered by
          interaction (either by click or hover) with a child element (usually a Button).
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Tooltip triggers</strong>
        <Space>
          <Tooltip content={text}>
            <Button>Trigger on hover</Button>
          </Tooltip>
          <Tooltip content={text} trigger="click">
            <Button>Trigger on click</Button>
          </Tooltip>
          <Tooltip content={text} trigger="contextMenu">
            <Button>Trigger on right click</Button>
          </Tooltip>
        </Space>
        <strong>Variations</strong>
        <p>Without arrow</p>
        <Space>
          <Tooltip content={text} placement="bottom" showArrow={false}>
            <Button>Tooltip without arrow</Button>
          </Tooltip>
        </Space>
        <p>Tooltip on badge</p>
        <Space>
          <Tooltip content={text}>
            <Badge text="Badge" />
          </Tooltip>
        </Space>
        <p>Placement</p>
        <div>
          <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
            <Tooltip content={text} placement="topLeft">
              <Button>TL</Button>
            </Tooltip>
            <Tooltip content={text} placement="top">
              <Button>Top</Button>
            </Tooltip>
            <Tooltip content={text} placement="topRight">
              <Button>TR</Button>
            </Tooltip>
          </div>
          <div style={{ float: 'left', width: buttonWidth }}>
            <Tooltip content={text} placement="leftTop">
              <Button>LT</Button>
            </Tooltip>
            <Tooltip content={text} placement="left">
              <Button>Left</Button>
            </Tooltip>
            <Tooltip content={text} placement="leftBottom">
              <Button>LB</Button>
            </Tooltip>
          </div>
          <div style={{ marginLeft: buttonWidth * 4 + 24, width: buttonWidth }}>
            <Tooltip content={text} placement="rightTop">
              <Button>RT</Button>
            </Tooltip>
            <Tooltip content={text} placement="right">
              <Button>Right</Button>
            </Tooltip>
            <Tooltip content={text} placement="rightBottom">
              <Button>RB</Button>
            </Tooltip>
          </div>
          <div style={{ clear: 'both', marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
            <Tooltip content={text} placement="bottomLeft">
              <Button>BL</Button>
            </Tooltip>
            <Tooltip content={text} placement="bottom">
              <Button>Bottom</Button>
            </Tooltip>
            <Tooltip content={text} placement="bottomRight">
              <Button>BR</Button>
            </Tooltip>
          </div>
        </div>
      </AntDCard>
    </ComponentSection>
  );
};

const ColumnSection: React.FC = () => {
  return (
    <ComponentSection id="Column">
      <AntDCard title="Column">
        <p>
          A <code>{'<Column>'}</code> wraps child components to be displayed in a vertical column.
          <br />
        </p>
        <hr />
        <p>
          The content within a Column can be aligned according to an <code>{'align'}</code> value.
        </p>
        <Row>
          <Surface>
            <Column align="left">Left-aligned column</Column>
          </Surface>
          <Surface>
            <Column align="center">Center-aligned column</Column>
          </Surface>
          <Surface>
            <Column align="right">Right-aligned column</Column>
          </Surface>
        </Row>
        <hr />
        <p>
          A Column can have a vertical <code>{'gap'}</code>.
        </p>
        <p>
          Column with <code>{'gap'}</code> set to 0:
        </p>
        <Column gap={0}>
          <Row>
            <Surface>Row content</Surface>
          </Row>
          <Row>
            <Surface>Row content</Surface>
          </Row>
        </Column>
        <p>
          Column with <code>{'gap'}</code> set to 8 (default):
        </p>
        <Column gap={8}>
          <Row>
            <Surface>Row content</Surface>
          </Row>
          <Row>
            <Surface>Row content</Surface>
          </Row>
        </Column>
        <p>
          Column with <code>{'gap'}</code> set to 16:
        </p>
        <Column gap={16}>
          <Row>
            <Surface>Row content</Surface>
          </Row>
          <Row>
            <Surface>Row content</Surface>
          </Row>
        </Column>
        <hr />
        <p>
          A Column can have a <code>{'width'}</code>, which is only applied when wrapped in a Row.
        </p>
        <p>Row with 3 Fill Width (default) columns:</p>
        <Row>
          <Column width="fill">
            <Surface>Fill Width</Surface>
          </Column>
          <Column width="fill">
            <Surface>Fill Width</Surface>
          </Column>
          <Column width="fill">
            <Surface>Fill Width</Surface>
          </Column>
        </Row>
        <p>Row with 3 Hug Width columns:</p>
        <Row>
          <Column width="hug">
            <Surface>Hug Width</Surface>
          </Column>
          <Column width="hug">
            <Surface>Hug Width</Surface>
          </Column>
          <Column width="hug">
            <Surface>Hug Width</Surface>
          </Column>
        </Row>
        <p>Row with 3 Fixed pixel width columns:</p>
        <Row>
          <Column width={200}>
            <Surface>Fixed Pixel Width</Surface>
          </Column>
          <Column width={200}>
            <Surface>Fixed Pixel Width</Surface>
          </Column>
          <Column width={200}>
            <Surface>Fixed Pixel Width</Surface>
          </Column>
        </Row>
        <p>Row with 3 columns of each width type:</p>
        <Row>
          <Column width="fill">
            <Surface>Fill Width</Surface>
          </Column>
          <Column width="hug">
            <Surface>Hug Width</Surface>
          </Column>
          <Column width={200}>
            <Surface>Fixed Pixel Width</Surface>
          </Column>
        </Row>
      </AntDCard>
      <AntDCard title="Row">
        <p>
          A <code>{'<Row>'}</code> wraps child components to be displayed in a horizontal row.
        </p>
        <hr />
        <p>
          A Row can have a horizontal <code>{'gap'}</code>.
        </p>
        <p>
          Row with <code>{'gap'}</code> set to 0:
        </p>
        <Row gap={0}>
          <Surface>{loremIpsum}</Surface>
          <Surface>{loremIpsum}</Surface>
          <Surface>{loremIpsum}</Surface>
        </Row>
        <p>
          Row with <code>{'gap'}</code> set to 8 (default):
        </p>
        <Row>
          <Surface>{loremIpsum}</Surface>
          <Surface>{loremIpsum}</Surface>
          <Surface>{loremIpsum}</Surface>
        </Row>
        <p>
          Row with <code>{'gap'}</code> set to 16:
        </p>
        <Row gap={16}>
          <Surface>{loremIpsum}</Surface>
          <Surface>{loremIpsum}</Surface>
          <Surface>{loremIpsum}</Surface>
        </Row>
        <hr />
        <p>
          A Row can have its child components <code>{'wrap'}</code>.
        </p>
        <div style={{ width: 400 }}>
          <Surface>
            <Row wrap>
              <Column width={100}>
                <Surface>Column 1</Surface>
              </Column>
              <Column width={100}>
                <Surface>Column 2</Surface>
              </Column>
              <Column width={100}>
                <Surface>Column 3</Surface>
              </Column>
              <Column width={100}>
                <Surface>Column 4</Surface>
              </Column>
              <Column width={100}>
                <Surface>Column 5</Surface>
              </Column>
              <Column width={100}>
                <Surface>Column 6</Surface>
              </Column>
            </Row>
          </Surface>
        </div>
        <hr />
        <p>
          A Row can have a fixed-pixel <code>{'height'}</code>.
        </p>
        <p>Row with fixed-pixel height of 100px:</p>
        <Row height={100}>
          <Column>
            <Surface>Column 1</Surface>
          </Column>
          <Column>
            <Surface>Column 2</Surface>
          </Column>
          <Column>
            <Surface>Column 3</Surface>
          </Column>
          <Column>
            <Surface>Column 4</Surface>
          </Column>
          <Column>
            <Surface>Column 5</Surface>
          </Column>
          <Column>
            <Surface>Column 6</Surface>
          </Column>
        </Row>
      </AntDCard>
      <AntDCard title="Nesting">
        <p>
          <code>{'<Column>'}</code>s and <code>{'<Row>'}</code>s can nest arbitrarily
        </p>
        <Row>
          <Column>
            <Surface>
              <Row>
                <Column>
                  <Surface>Base Row, Column 1, Row 1, Column 1</Surface>
                </Column>
                <Column>
                  <Surface>Base Row, Column 1, Row 1, Column 2</Surface>
                </Column>
              </Row>
            </Surface>
          </Column>
          <Column>
            <Surface>
              <Column>
                <Row>
                  <Column>
                    <Surface>Base Row, Column 2, Row 1, Column 1</Surface>
                  </Column>
                  <Column>
                    <Surface>Base Row, Column 2, Row 1, Column 2</Surface>
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <Surface>Base Row, Column 2, Row 2, Column 1</Surface>
                  </Column>
                  <Column>
                    <Surface>Base Row, Column 2, Row 2, Column 2</Surface>
                  </Column>
                </Row>
              </Column>
            </Surface>
          </Column>
        </Row>
      </AntDCard>
    </ComponentSection>
  );
};

const GlossarySection: React.FC = () => {
  return (
    <ComponentSection id="Glossary">
      <AntDCard>
        <p>
          A Glossary <code>{'<Glossary>'}</code> component displays a series of terms alongside
          their definitions or values.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Align values left (default)</strong>
        <Glossary
          content={[
            { label: 'Key', value: 'Value' },
            { label: 'Multiple values', value: ['Value 1', 'Value 2', 'Value 3'] },
            { label: 'Component value', value: <Surface>Arbitrary component</Surface> },
            { label: "Value shouldn't overflow", value: loremIpsum.split(' ').join('') },
          ]}
        />
        <strong>Align values right</strong>
        <Glossary
          alignValues="right"
          content={[
            { label: 'Key', value: 'Value' },
            { label: 'Multiple values', value: ['Value 1', 'Value 2', 'Value 3'] },
            { label: 'Component value', value: <Surface>Arbitrary component</Surface> },
            {
              label: "Don't align text inside component value",
              value: (
                <Surface>
                  <div style={{ width: 200 }}>Arbitrary component</div>
                </Surface>
              ),
            },
            { label: "Value shouldn't overflow", value: loremIpsum.split(' ').join('') },
          ]}
        />
      </AntDCard>
    </ComponentSection>
  );
};

const IconsSection: React.FC = () => {
  return (
    <ComponentSection id="Icons">
      <AntDCard>
        <p>
          An <code>{'<Icon>'}</code> component displays an icon from a custom font along with an
          optional tooltip.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Icon default</strong>
        <Icon name="star" title="star" />
        <strong>Icon variations</strong>
        <p>Icon with tooltip</p>
        <Icon name="star" title="Tooltip" />
        <p>Icon sizes</p>
        <Space wrap>
          {IconSizeArray.map((size) => (
            <Icon key={size} name="star" showTooltip size={size} title={size} />
          ))}
        </Space>
        <p>Icon colors</p>
        <Space wrap>
          {(['cancel', 'error', 'success'] as const).map((c) => (
            <Icon color={c} key={c} name="star" showTooltip title={c} />
          ))}
        </Space>
        <p>All icons</p>
        <Space split={<span style={{ opacity: 0.3 }}>|</span>} wrap>
          {IconNameArray.map((name) => (
            <Space align="center" direction="vertical" key={name} size={0}>
              <Icon name={name} showTooltip title={name} />
              <p>{name}</p>
            </Space>
          ))}
        </Space>
      </AntDCard>
    </ComponentSection>
  );
};

const ToastSection: React.FC = () => {
  const { openToast } = useToast();
  return (
    <ComponentSection id="Toast">
      <AntDCard>
        <p>
          A <code>{'<Toast>'}</code> component is used to display a notification message at the
          viewport. Typically it&apos;s a notification providing a feedback based on the user
          interaction.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Default toast</strong>
        <Space>
          <Button
            onClick={() =>
              openToast({
                description: 'Some informative content.',
                severity: 'Info',
                title: 'Default notification',
              })
            }>
            Open a default toast
          </Button>
        </Space>
        <strong>Variations</strong>
        <Space>
          <Button
            onClick={() =>
              openToast({
                description: "You've triggered an error.",
                severity: 'Error',
                title: 'Error notification',
              })
            }>
            Open an error toast
          </Button>
          <Button
            onClick={() =>
              openToast({
                description: "You've triggered an warning.",
                severity: 'Warning',
                title: 'Warning notification',
              })
            }>
            Open an warning toast
          </Button>
          <Button
            onClick={() =>
              openToast({
                description: 'Action succed.',
                severity: 'Confirm',
                title: 'Success notification',
              })
            }>
            Open an success toast
          </Button>
        </Space>
        <Space>
          <Button
            onClick={() =>
              openToast({
                closeable: false,
                description: "You've triggered an error.",
                severity: 'Error',
                title: 'Error notification',
              })
            }>
            Open a non-closable toast
          </Button>
          <Button
            onClick={() =>
              openToast({
                description: 'Click below to design kit page.',
                link: <a href="#">View Design Kit</a>,
                severity: 'Info',
                title: 'Welcome to design kit',
              })
            }>
            Open a toast with link
          </Button>
          <Button onClick={() => openToast({ severity: 'Info', title: 'Compact notification' })}>
            Open a toast without description
          </Button>
        </Space>
      </AntDCard>
    </ComponentSection>
  );
};

const ToggleSection: React.FC = () => {
  return (
    <ComponentSection id="Toggle">
      <AntDCard>
        <p>
          A <code>{'<Toggle>'}</code> component represents switching between two states. This
          component is controlled by its parent and may optionally include a label.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Toggle default</strong>
        <Toggle />
        <strong>Toggle variations</strong>
        <Toggle checked={true} />
        <Toggle label="Label" />
      </AntDCard>
    </ComponentSection>
  );
};

/* modal section */

const handleSubmit = async (fail?: boolean) => {
  if (fail) throw new Error('Error message');
  await new Promise((r) => setTimeout(r, 1000));
  return;
};

const SmallModalComponent: React.FC<{ value: string }> = ({ value }) => {
  return (
    <Modal size="small" title={value}>
      <div>{value}</div>
    </Modal>
  );
};

const MediumModalComponent: React.FC<{ value: string }> = ({ value }) => {
  return (
    <Modal size="medium" title={value}>
      <div>{value}</div>
    </Modal>
  );
};

const LargeModalComponent: React.FC<{ value: string }> = ({ value }) => {
  return (
    <Modal size="large" title={value}>
      <div>{value}</div>
    </Modal>
  );
};

const IconModalComponent: React.FC<{ value: string }> = ({ value }) => {
  return (
    <Modal icon="experiment" title={value}>
      <div>{value}</div>
    </Modal>
  );
};

const LinksModalComponent: React.FC<{ value: string }> = ({ value }) => {
  return (
    <Modal cancel footerLink={<a>Footer Link</a>} headerLink={<a>Header Link</a>} title={value}>
      <div>{value}</div>
    </Modal>
  );
};

const FormModalComponent: React.FC<{ value: string; fail?: boolean }> = ({ value, fail }) => {
  const { openToast } = useToast();
  const handleError = () =>
    openToast({
      description: 'Something bad happened!',
      severity: 'Error',
      title: 'Error',
    });
  return (
    <Modal
      cancel
      submit={{
        handleError,
        handler: () => handleSubmit(fail),
        text: 'Submit',
      }}
      title={value}>
      <Form>
        <Form.Item label="Workspace" name="workspaceId">
          <Select allowClear defaultValue={1} placeholder="Workspace (required)">
            <Option key="1" value="1">
              WS AS
            </Option>
            <Option key="2" value="2">
              Further
            </Option>
            <Option key="3" value="3">
              Whencelan
            </Option>
          </Select>
        </Form.Item>
        <Form.Item className={css.line} label="Template" name="template">
          <Select allowClear placeholder="No template (optional)">
            <Option key="1" value={1}>
              Default Template
            </Option>
          </Select>
        </Form.Item>
        <Form.Item className={css.line} label="Name" name="name">
          <Input defaultValue={value} placeholder="Name (optional)" />
        </Form.Item>
        <Form.Item className={css.line} label="Resource Pool" name="pool">
          <Select allowClear placeholder="Pick the best option">
            <Option key="1" value="1">
              GPU Pool
            </Option>
            <Option key="2" value="2">
              Aux Pool
            </Option>
          </Select>
        </Form.Item>
        <Form.Item className={css.line} label="Slots" name="slots">
          <InputNumber max={10} min={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ValidationModalComponent: React.FC<{ value: string }> = ({ value }) => {
  const [form] = Form.useForm();
  const alias = Form.useWatch('alias', form);
  const { openToast } = useToast();
  const handleError = () =>
    openToast({
      description: 'Something bad happened!',
      severity: 'Error',
      title: 'Error',
    });

  return (
    <Modal
      cancel
      submit={{
        disabled: !alias,
        handleError,
        handler: handleSubmit,
        text: 'Submit',
      }}
      title={value}>
      <Form form={form}>
        <Form.Item className={css.line} label="Name" name="name">
          <Input defaultValue={value} placeholder="Name (optional)" />
        </Form.Item>
        <Form.Item className={css.line} label="Alias" name="alias" required>
          <Input placeholder="Alias" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ModalSection: React.FC = () => {
  const [text, setText] = useState('State value that gets passed to modal via props');
  const SmallModal = useModal(SmallModalComponent);
  const MediumModal = useModal(MediumModalComponent);
  const LargeModal = useModal(LargeModalComponent);
  const FormModal = useModal(FormModalComponent);
  const FormFailModal = useModal(FormModalComponent);
  const LinksModal = useModal(LinksModalComponent);
  const IconModal = useModal(IconModalComponent);
  const ValidationModal = useModal(ValidationModalComponent);
  const { openToast } = useToast();
  const handleError = () =>
    openToast({
      description: 'Something bad happened!',
      severity: 'Error',
      title: 'Error',
    });

  const confirm = useConfirm();
  const config = { content: text, title: text };
  const confirmDefault = () =>
    confirm({ ...config, onConfirm: voidPromiseFn, onError: handleError });
  const confirmDangerous = () =>
    confirm({
      ...config,
      danger: true,
      onConfirm: voidPromiseFn,
      onError: handleError,
    });

  return (
    <ComponentSection id="Modals">
      <AntDCard title="Usage">
        <label>State value that gets passed to modal via props</label>
        <Input value={text} onChange={(s) => setText(String(s.target.value))} />
        <hr />
        <strong>Sizes</strong>
        <Space>
          <Button onClick={SmallModal.open}>Open Small Modal</Button>
          <Button onClick={MediumModal.open}>Open Medium Modal</Button>
          <Button onClick={LargeModal.open}>Open Large Modal</Button>
        </Space>
        <hr />
        <strong>Links and Icons</strong>
        <Space>
          <Button onClick={LinksModal.open}>Open Modal with Header and Footer Links</Button>
          <Button onClick={IconModal.open}>Open Modal with Title Icon</Button>
        </Space>
        <hr />
        <strong>With form submission</strong>
        <Space>
          <Button onClick={FormModal.open}>Open Form Modal (Success)</Button>
          <Button onClick={FormFailModal.open}>Open Form Modal (Failure)</Button>
        </Space>
        <hr />
        <strong>With form validation</strong>
        <Space>
          <Button onClick={ValidationModal.open}>Open Modal with Form Validation</Button>
        </Space>
        <hr />
        <strong>Variations</strong>
        <Space>
          <Button onClick={confirmDefault}>Open Confirmation</Button>
          <Button onClick={confirmDangerous}>Open Dangerous Confirmation</Button>
        </Space>
      </AntDCard>
      <SmallModal.Component value={text} />
      <MediumModal.Component value={text} />
      <LargeModal.Component value={text} />
      <FormModal.Component value={text} />
      <FormFailModal.Component fail value={text} />
      <LinksModal.Component value={text} />
      <IconModal.Component value={text} />
      <ValidationModal.Component value={text} />
    </ComponentSection>
  );
};

const LongLoadingComponent = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let active = true;
    setTimeout(() => {
      if (active) setLoaded(true);
    }, 5000);
    return () => {
      active = false;
    };
  }, []);

  return <div>This component is {loaded ? 'done loading!!!!!! wowza!!' : 'not loaded :('}</div>;
};

const AccordionSection: React.FC = () => {
  const [controlStateSingle, setControlStateSingle] = useState(false);
  const [controlStateGroup, setControlStateGroup] = useState(1);
  return (
    <ComponentSection id="Accordion">
      <AntDCard>
        <p>
          An <code>{'<Accordion>'}</code> hides content behind a header. Typically found in forms,
          they hide complex content until the user interacts with the header.
        </p>
      </AntDCard>
      <AntDCard title="Singular usage">
        <p>
          An <code>{'<Accordion>'}</code> requires a title and content to show:
        </p>
        <Accordion title="Title">Children</Accordion>
        <p>
          By default, <code>{'<Accordion>'}</code> components control their open state themselves,
          but can be controlled externally:
        </p>
        <Checkbox
          checked={controlStateSingle}
          onChange={(e) => setControlStateSingle(e.target.checked)}>
          Check me to open the accordion below!
        </Checkbox>
        <Accordion open={controlStateSingle} title="Controlled by the above checkbox">
          Hello!
        </Accordion>
        <p>You can also render an uncontrolled accordion as open by default:</p>
        <Accordion defaultOpen title="Open by default">
          You should see me on page load.
        </Accordion>
        <p>
          By default, the content of an <code>{'<Accordion>'}</code> isn&apos;t mounted until
          opened, after which, the content stays mounted:
        </p>
        <Accordion title="Child will mount when opened and stay mounted after close">
          <LongLoadingComponent />
        </Accordion>
        <p>
          This can be changed to either mount the content along with the rest of the{' '}
          <code>{'<Accordion>'}</code> or to mount the content each time the component is opened:
        </p>
        <Accordion mountChildren="immediately" title="Child is already mounted">
          <LongLoadingComponent />
        </Accordion>
        <Accordion
          mountChildren="on-open"
          title="Child will mount when opened and unmount on close">
          <LongLoadingComponent />
        </Accordion>
      </AntDCard>
      <AntDCard title="Group usage">
        <p>
          <code>{'<Accordion>'}</code> components can be grouped together:
        </p>
        <Accordion.Group>
          <Accordion title="First child">One</Accordion>
          <Accordion title="Second child">Two</Accordion>
          <Accordion title="Third child">Three</Accordion>
        </Accordion.Group>
        <p>
          When grouped, the <code>{'<Accordion.Group>'}</code> component is responsible for keeping
          track of which component is open. As before, by default, the component keeps its own
          internal state, but can be controlled externally, as well as with a default initial state.
        </p>
        <Select value={controlStateGroup} onChange={(e) => setControlStateGroup(e as number)}>
          <Option key={1} value={1}>
            One
          </Option>
          <Option key={2} value={2}>
            Two
          </Option>
          <Option key={3} value={3}>
            Three
          </Option>
        </Select>
        <Accordion.Group openKey={controlStateGroup}>
          <Accordion key={1} title="First child">
            One
          </Accordion>
          <Accordion key={2} title="Second child">
            Two
          </Accordion>
          <Accordion key={3} title="Third child">
            Three
          </Accordion>
        </Accordion.Group>
        <Accordion.Group defaultOpenKey={3}>
          <Accordion key={1} title="First child">
            One
          </Accordion>
          <Accordion key={2} title="Second child">
            Two
          </Accordion>
          <Accordion key={3} title="Third child">
            Three! I&apos;m open by default!
          </Accordion>
        </Accordion.Group>
        <p>
          Controlled/uncontrolled <code>{'<Accordion.Group>'}</code> components can have multiple
          components open at the same time by default as well:
        </p>
        <Accordion.Group defaultOpenKey={[1, 3]}>
          <Accordion key={1} title="First child">
            One! I&apos;m open by default!
          </Accordion>
          <Accordion key={2} title="Second child">
            Two
          </Accordion>
          <Accordion key={3} title="Third child">
            Three! I&apos;m also open by default.
          </Accordion>
        </Accordion.Group>
        <p>
          You can configure an uncontrolled <code>{'<Accordion.Group>'}</code>
          component to only be able to have one child open at a time
        </p>
        <Accordion.Group exclusive>
          <Accordion key={1} title="First child">
            One! I&apos;m open by default!
          </Accordion>
          <Accordion key={2} title="Second child">
            Two
          </Accordion>
          <Accordion key={3} title="Third child">
            Three! I&apos;m also open by default.
          </Accordion>
        </Accordion.Group>
      </AntDCard>
    </ComponentSection>
  );
};

const DrawerSection: React.FC = () => {
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const scrollLines = [];
  for (let i = 0; i < 100; i++) {
    scrollLines.push(i);
  }

  return (
    <ComponentSection id="Drawer">
      <AntDCard>
        <p>
          An <code>{'<Drawer>'}</code> is a full-height overlaid sidebar which moves into the
          viewport from the left or right side.
        </p>
      </AntDCard>
      <AntDCard title="Left side">
        <p>
          Drawer appears from the left side in an animation. Similar to a Modal, it can be closed
          only by clicking a Close button (at top right) or Escape key.
        </p>
        <p>If the drawer body has extra content, it is scrollable without hiding the header.</p>
        <Space>
          <Button onClick={() => setOpenLeft(true)}>Open Drawer</Button>
        </Space>
        <Drawer
          open={openLeft}
          placement="left"
          title="Left Drawer"
          onClose={() => setOpenLeft(!openLeft)}>
          {scrollLines.map((i) => (
            <p key={i}>Sample scrollable content</p>
          ))}
        </Drawer>
      </AntDCard>
      <AntDCard title="Right side">
        <p>Drawer appears from the right side.</p>
        <p>
          When a drawer has stateful content, that state is persisted when closed and re-opened.
        </p>
        <Space>
          <Button onClick={() => setOpenRight(true)}>Open Drawer</Button>
        </Space>
        <Drawer
          open={openRight}
          placement="right"
          title="Right Drawer"
          onClose={() => setOpenRight(!openRight)}>
          <p>Sample content</p>
          <Checkbox>A</Checkbox>
          <Checkbox>B</Checkbox>
          <Checkbox>C</Checkbox>
          <Checkbox>D</Checkbox>
          <Form.Item label="Sample Persistent Input" name="sample_drawer">
            <Input.TextArea />
          </Form.Item>
        </Drawer>
      </AntDCard>
    </ComponentSection>
  );
};

const SpinnerSection = () => {
  const [spinning, setSpinning] = useState(true);
  const [loadableData, setLoadableData] = useState<Loadable<string>>(NotLoaded);

  useEffect(() => {
    if (Loadable.isLoaded(loadableData)) return;
    let active = true;
    setTimeout(() => {
      if (active) setLoadableData(Loaded('This text has been loaded!'));
    }, 1000);
    return () => {
      active = false;
    };
  }, [loadableData]);

  return (
    <ComponentSection id="Spinner">
      <AntDCard>
        <p>
          A <code>{'<Spinner>'}</code> indicates a loading state of a page or section.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Spinner default</strong>
        <Spinner spinning />
        <strong>Spinner with children</strong>
        <div style={{ border: '1px solid var(--theme-surface-border)', padding: 8, width: '100%' }}>
          <Spinner spinning>
            <Card.Group size="medium">
              <Card size="medium" />
              <Card size="medium" />
            </Card.Group>
          </Spinner>
        </div>
        <strong>Spinner with conditional rendering</strong>
        <Toggle checked={spinning} label="Loading" onChange={setSpinning} />
        <div
          style={{
            border: '1px solid var(--theme-surface-border)',
            height: 300,
            padding: 8,
            width: '100%',
          }}>
          <Spinner conditionalRender spinning={spinning}>
            <Card size="medium" />
          </Spinner>
        </div>
        <strong>Loadable spinner</strong>
        <Button onClick={() => setLoadableData(NotLoaded)}>Unload</Button>
        <Spinner data={loadableData}>{(data) => <p>{data}</p>}</Spinner>
        <hr />
        <strong>Variations</strong>
        <strong>Centered Spinner</strong>
        <div
          style={{ border: '1px solid var(--theme-surface-border)', height: 200, width: '100%' }}>
          <Spinner center spinning />
        </div>
        <strong>Spinner with tip</strong>
        <Spinner spinning tip="Tip" />
        <strong>Spinner sizes</strong>
        <Space>
          {IconSizeArray.map((size) => (
            <Spinner key={size} size={size} spinning tip={size} />
          ))}
        </Space>
      </AntDCard>
    </ComponentSection>
  );
};

const MessageSection: React.FC = () => {
  return (
    <ComponentSection id="Message">
      <AntDCard>
        <p>
          A <code>{'<Message>'}</code> displays persistent information related to the application
          state. Requires at least one of description or title. Optionally displays an action button
          and/or an icon.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <Message
          action={<Button>Optional action button</Button>}
          description={
            <>
              Message description, with a <a href="#">link to more info</a>
            </>
          }
          icon="info"
          title="Message title"
        />
      </AntDCard>
    </ComponentSection>
  );
};

const RadioGroupSection: React.FC = () => {
  const [currentValue, setCurrentValue] = useState('');
  const [currentDefaultValue, setCurrentDefaultValue] = useState<string | undefined>(undefined);

  const onChange = useCallback(
    (newValue: string | number) => setCurrentValue(newValue as string),
    [],
  );
  const onChangeDefaultValue = useCallback(
    (newValue: string | number) => setCurrentDefaultValue(newValue as string),
    [],
  );

  const options = [
    {
      id: '1',
      label: 'option 1',
    },
    {
      id: '2',
      label: 'option 2',
    },
    {
      id: '3',
      label: 'option 3',
    },
    {
      id: '4',
      label: 'option 4',
    },
  ];

  return (
    <ComponentSection id="RadioGroup">
      <AntDCard>
        <p>
          The (<code>{'<RadioGroup>'}</code>) serves as a collection of options to choose from.
        </p>
        <p>It can be represented as radio buttons or simple buttons.</p>
      </AntDCard>
      <AntDCard title="Usage">
        <p>Without a default value</p>
        <br />
        <p>Button style</p>
        <RadioGroup options={options} value={currentValue} onChange={onChange} />
        <p>Radio style</p>
        <RadioGroup options={options} radioType="radio" value={currentValue} onChange={onChange} />
        <br />
        <p>With a default value</p>
        <br />
        <p>Button style</p>
        <RadioGroup
          defaultValue="1"
          options={options}
          value={currentDefaultValue}
          onChange={onChangeDefaultValue}
        />
        <p>Radio style</p>
        <RadioGroup
          defaultValue="1"
          options={options}
          radioType="radio"
          value={currentDefaultValue}
          onChange={onChangeDefaultValue}
        />
      </AntDCard>
    </ComponentSection>
  );
};

const SplitPaneSection: React.FC = () => {
  const [hideLeftPane, setHideLeftPane] = useState(true);
  const [hideRightPane, setHideRightPane] = useState(true);

  const line1: Serie = {
    color: '#009BDE',
    data: {
      [XAxisDomain.Batches]: [
        [0, -2],
        [2, 7],
        [4, 15],
        [6, 35],
        [9, 22],
        [10, 76],
        [18, 1],
        [19, 89],
      ],
    },
    name: 'training.Line',
  };

  const line2: Serie = {
    data: {
      [XAxisDomain.Batches]: [
        [1, 15],
        [2, 10.123456789],
        [2.5, 22],
        [3, 10.3909],
        [3.25, 19],
        [3.75, 4],
        [4, 12],
      ],
    },
    name: 'validation.Line',
  };

  const chart = (
    <LineChart
      handleError={() => {}}
      height={250}
      series={[line1, line2]}
      showLegend={true}
      title="Sample"
    />
  );

  const message = (
    <Message
      description="This message is rendered in the left pane"
      icon="info"
      title="Left Pane"
    />
  );

  return (
    <ComponentSection id="SplitPane">
      <AntDCard>
        <p>
          The <code>{'SplitPane'}</code> displays two resiszable sections of content. Additionally,
          it provides the ability to hide either pane.
        </p>
      </AntDCard>
      <AntDCard title="Usage">
        <strong>Default Split Pane</strong>
        <SplitPane leftPane={message} rightPane={chart} />
        <br />
        <strong>SplitPane with initial width</strong>
        <SplitPane initialWidth={500} leftPane={message} rightPane={chart} />
        <br />
        <strong>SplitPane with specified minimum pane widths</strong>
        <SplitPane
          initialWidth={600}
          leftPane={message}
          minimumWidths={{ [Pane.Left]: 350, [Pane.Right]: 275 }}
          rightPane={chart}
        />
        <br />
        <strong>SplitPane with left pane hidden</strong>
        <Toggle
          checked={!hideLeftPane}
          label="Toggle Left Pane"
          onChange={() => setHideLeftPane(!hideLeftPane)}
        />
        <SplitPane
          hidePane={hideLeftPane ? Pane.Left : undefined}
          leftPane={message}
          rightPane={chart}
        />
        <br />
        <strong>SplitPane with right pane hidden</strong>
        <Toggle
          checked={!hideRightPane}
          label="Toggle Right Pane"
          onChange={() => setHideRightPane(!hideRightPane)}
        />
        <SplitPane
          hidePane={hideRightPane ? Pane.Right : undefined}
          leftPane={message}
          rightPane={chart}
        />
      </AntDCard>
    </ComponentSection>
  );
};

const Components: Record<ComponentIds, JSX.Element> = {
  Accordion: <AccordionSection />,
  Avatar: <AvatarSection />,
  Badges: <BadgeSection />,
  Breadcrumbs: <BreadcrumbsSection />,
  Buttons: <ButtonsSection />,
  Cards: <CardsSection />,
  Charts: <ChartsSection />,
  Checkboxes: <CheckboxesSection />,
  ClipboardButton: <ClipboardButtonSection />,
  CodeEditor: <CodeEditorSection />,
  CodeSample: <CodeSampleSection />,
  Collection: <CollectionSection />,
  Color: <ColorSection />,
  Column: <ColumnSection />,
  DatePicker: <DatePickerSection />,
  Drawer: <DrawerSection />,
  Dropdown: <DropdownSection />,
  Form: <FormSection />,
  Glossary: <GlossarySection />,
  Icons: <IconsSection />,
  InlineForm: <InlineFormSection />,
  Input: <InputSection />,
  InputNumber: <InputNumberSection />,
  InputSearch: <InputSearchSection />,
  InputShortcut: <InputShortcutSection />,
  Link: <LinkSection />,
  LogViewer: <LogViewerSection />,
  Message: <MessageSection />,
  Modals: <ModalSection />,
  Nameplate: <NameplateSection />,
  Pagination: <PaginationSection />,
  Pivot: <PivotSection />,
  Progress: <ProgressSection />,
  RadioGroup: <RadioGroupSection />,
  ResponsiveGroup: <ResponsiveGroupSection />,
  RichTextEditor: <RichTextEditorSection />,
  Section: <SectionComponentSection />,
  Select: <SelectSection />,
  Spinner: <SpinnerSection />,
  SplitPane: <SplitPaneSection />,
  Surface: <SurfaceSection />,
  Tags: <TagsSection />,
  Theme: <ThemeSection />,
  Toast: <ToastSection />,
  Toggle: <ToggleSection />,
  Tooltips: <TooltipsSection />,
  Typography: <TypographySection />,
};

const DesignKit: React.FC<{
  mode: Mode;
  theme: Theme;
  themeIsDark: boolean;
  onChangeMode: (mode: Mode) => void;
}> = ({ mode, theme, themeIsDark, onChangeMode }) => {
  const searchParams = new URLSearchParams(location.search);
  const isExclusiveMode = searchParams.get('exclusive') === 'true';
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hash, setHash] = useState(location.hash.substring(1));
  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  useEffect(() => {
    const listener = () => setHash(location.hash.substring(1));
    window.addEventListener('hashchange', listener);
    return () => window.removeEventListener('hashchange', listener);
  });

  useEffect(() => {
    if (window.location.hash) {
      const hashSave = window.location.hash;
      window.location.hash = ''; // clear hash first
      window.location.hash = hashSave; // set hash again
    }
  }, []);

  return (
    // wrap in an antd component so links look correct
    <UIProvider theme={theme} themeIsDark={themeIsDark}>
      <Spinner spinning={false}>
        <div className={css.base}>
          <nav className={css.default}>
            <ul className={css.sections}>
              <li>
                <ThemeToggle mode={mode} onChange={onChangeMode} />
              </li>
              {componentOrder.map((componentId) => (
                <li key={componentId}>
                  <a href={`#${componentId}`}>{ComponentTitles[componentId]}</a>
                </li>
              ))}
            </ul>
          </nav>
          <nav className={css.mobile}>
            <div className={css.controls}>
              <ThemeToggle iconOnly mode={mode} onChange={onChangeMode} />
              <Button onClick={() => setIsDrawerOpen(true)}>Sections</Button>
            </div>
          </nav>
          <article>
            {componentOrder
              .filter((id) => !isExclusiveMode || !hash || id === hash)
              .map((componentId) => (
                <React.Fragment key={componentId}>{Components[componentId]}</React.Fragment>
              ))}
          </article>
          <Drawer open={isDrawerOpen} placement="right" title="Sections" onClose={closeDrawer}>
            <ul className={css.sections}>
              {componentOrder.map((componentId) => (
                <li key={componentId} onClick={closeDrawer}>
                  <a href={`#${componentId}`}>{ComponentTitles[componentId]}</a>
                </li>
              ))}
            </ul>
          </Drawer>
        </div>
      </Spinner>
    </UIProvider>
  );
};

const DesignKitContainer: React.FC = () => {
  const [mode, setMode] = useState<Mode>(Mode.Light);
  const systemMode = getSystemMode();

  const resolvedMode =
    mode === Mode.System ? (systemMode === Mode.System ? Mode.Light : systemMode) : mode;
  const themeMode = resolvedMode === Mode.Light ? Mode.Light : Mode.Dark;

  const themeIsDark = themeMode === Mode.Dark;
  const theme = themeIsDark ? DefaultTheme.Dark : DefaultTheme.Light;

  return (
    // wrap in an antd component so links look correct
    <UIProvider theme={theme} themeIsDark={themeIsDark}>
      <ConfirmationProvider>
        <App>
          <DesignKit
            mode={mode}
            theme={theme}
            themeIsDark={themeIsDark}
            onChangeMode={(mode: Mode) => setMode(mode)}
          />
        </App>
      </ConfirmationProvider>
    </UIProvider>
  );
};

export default DesignKitContainer;
