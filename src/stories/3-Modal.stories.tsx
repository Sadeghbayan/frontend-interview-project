import React, { FC } from 'react';
import { Store, withState } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import Modal from '../components/modal';
import {addDecorator, addParameters} from "@storybook/react";


interface Props {
  isShow: boolean;
  footer: boolean;
  toggle: (isShow: boolean) => void;
}

const store = new Store({
  isShow: false,
  footer: true,
  toggle: (isShow: boolean): void => {
    store.set({ isShow });
  },
});
addDecorator(withState());
addParameters({ state: { store } });

export default {
  title: 'Modal',
};

const MdoalRegularPreview: FC<Props> = (props) => {
  const { isShow, toggle, footer } = props;

  return (
    <div style={{ width: '200px' }}>
      <Modal
        isShow={isShow}
        toggle={toggle}
        title="Basic Modal with title and footer"
        footer={footer}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        Why do we use it?
      </Modal>
      <button onClick={()=>toggle(true)}>Basic modal with title and footer</button>
    </div>
  );
};

export const Regular = () => MdoalRegularPreview;



const MdoalWithoutFooterPreview: FC<Props> = (props) => {
  const { isShow, toggle, footer } = props;

  return (
    <div style={{ width: '200px' }}>
      <Modal
        isShow={isShow}
        toggle={toggle}
        title="Modal without footer"
        footer={!footer}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        Why do we use it?
      </Modal>
      <button onClick={()=>toggle(true)}>Open modal without footer</button>
    </div>
  );
};

export const WithoutFooter = () => MdoalWithoutFooterPreview;




const MdoalWithoutTitlePreview: FC<Props> = (props) => {
  const { isShow, toggle, footer } = props;

  const handleChange = (): void => {
    store.set({ isShow: false });
    action('Status of Modal')(!isShow);
  };

  return (
    <div style={{ width: '200px' }}>
      <Modal
        isShow={isShow}
        toggle={(): void => handleChange()}
        footer={footer}
      >
        Do you want to delete these items?
      </Modal>
      <button onClick={()=>toggle(true)}>Open modal without title and change function</button>
    </div>
  );
};

export const WithoutTitlePreview = () => MdoalWithoutTitlePreview;
