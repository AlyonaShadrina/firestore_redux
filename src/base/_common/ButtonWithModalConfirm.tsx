import React, { ReactNode } from 'react';
import {
    Button, Header, Icon, Modal,
} from 'semantic-ui-react';


type OwnProps = {
    button: ReactNode;
    icon?: string;
    header: string;
    content: string;
    action: () => void;
};

const ButtonWithModalConfirm = ({
    button, icon, header, content, action,
}: OwnProps) => (
    <Modal trigger={button} basic size="small">
        <Header icon={icon} content={header} />
        <Modal.Content>
            <p>{content}</p>
        </Modal.Content>
        <Modal.Actions>
            <Button basic color="red" inverted>
                <Icon name="remove" />
                No
            </Button>
            <Button color="green" inverted onClick={action}>
                <Icon name="checkmark" />
                Yes
            </Button>
        </Modal.Actions>
    </Modal>
);

export default ButtonWithModalConfirm;
