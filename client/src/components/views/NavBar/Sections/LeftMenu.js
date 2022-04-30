import React from "react";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">
          <span className="navbarFont">Home</span>
        </a>
      </Menu.Item>
      <SubMenu title={<span className="navbarFont">Category</span>}>
        <MenuItemGroup title="Movie List">
          <Menu.Item>
            <a href="/list/popular">
              <span className="navbarFont">Popular List</span>
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="/list/nowPlaying">
              <span className="navbarFont">Now playing List</span>
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="/list/topRated">
              <span className="navbarFont">Top Rated List</span>
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="/list/upcoming">
              <span className="navbarFont">Upcoming List</span>
            </a>
          </Menu.Item>
        </MenuItemGroup>
        {!window.localStorage.userId && <MenuItemGroup title="You can see more menus when you log in" />}
        {window.localStorage.userId && (
          <MenuItemGroup title="My Movies">
            <Menu.Item>
              <a href="/list/likeMovies">
                <span className="navbarFont">Liked Movie List</span>
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="/list/dislikeMovies">
                <span className="navbarFont">Disliked Movie List</span>
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="/list/commentsList">
                <span className="navbarFont">Your Comments List</span>
              </a>
            </Menu.Item>
          </MenuItemGroup>
        )}
      </SubMenu>
    </Menu>
  );
}

export default LeftMenu;
