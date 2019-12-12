import React from 'react';
import { Menu, Sidebar } from 'semantic-ui-react';

const SideMenu = () => {

    return (
        <Sidebar
            as={Menu}
            icon='labeled'
            inverted
            vertical
            visible={true}
            width='thin'
        >
            <Menu.Item>
                <Menu.Header>Boards</Menu.Header>

                <Menu.Menu>
                    <Menu.Item
                        name="enterprise"
                        active={false}
                    />
                    <Menu.Item
                        name="consumer"
                        active={false}
                    />
                </Menu.Menu>
            </Menu.Item>
        </Sidebar>
    );
};

export default SideMenu;
