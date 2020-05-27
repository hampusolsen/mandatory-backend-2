import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { destroyUser } from "../../store/actions/user";
import { showModal } from "../../store/actions/modal";
import { Redirect, Link } from "react-router-dom";
import Clock from "../Clock/Clock";
import { initWorkspace } from "../../store/actions/workspace";

export default function Mainmenu() {
  const user = useSelector((state) => state.user);
  const Dispatch = useDispatch();

  if (!user.email) return <Redirect to="/" />;

  return (
    <main className="Mainmenu">
      <div className="Mainmenu__box Mainmenu__box--current">
        <p>Welcome, {user.first_name}.</p>
      </div>
      <div className="Mainmenu__box Mainmenu__box--num-of-lists">
        <p>Tickets</p>
        <p>{user.items_owned.length}</p>
      </div>
      <div className="Mainmenu__box Mainmenu__box--num-of-workspaces">
        <p>Workspaces</p>
        <p>{user.workspaces_joined.length}</p>
      </div>
      <div className="Mainmenu__box Mainmenu__box--menu">
        <ul>
          <li>
            <button className="Mainmenu__menu-button" onClick={() => Dispatch(showModal("CreateWorkspace"))}>
              <span className="i--workspace-create" />
              Create Workspace
            </button>
          </li>
          <li>
            <button className="Mainmenu__menu-button">
              <span className="i--message" />
              Messages
            </button>
          </li>
          <li>
            <button className="Mainmenu__menu-button">
              <span className="i--profile" />
              Change Profile
            </button>
          </li>
          <li>
            <button className="Mainmenu__menu-button">
              <span className="i--review" />
              Review Tickets
            </button>
          </li>
        </ul>
      </div>
      <div className="Mainmenu__box Mainmenu__box--workspaces Mainmenu__workspace-list">
        <label htmlFor="workspace-list" className="Mainmenu__workspace-list__label">
          Go To Workspace
        </label>
        <ul id="workspace-list">
          {user.workspaces_joined.map(({ title, _id }) => (
            <li key={_id} className="Mainmenu__workspace-list__item">
              <Link onClick={() => Dispatch(initWorkspace({ title, _id }))} to={`/client/${_id}`} className="Mainmenu__workspace-list__link">
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="Mainmenu__box Mainmenu__box--profile">
        <div>
          <p className="Mainmenu__notification">
            <span className="Mainmenu__message-icon" />0
          </p>
          <p className="Mainmenu__notification">
            <span className="Mainmenu__workspace-icon" />0
          </p>
        </div>
        <Clock />
      </div>
      <div className="Mainmenu__box Mainmenu__box--logo">
        <h1>mello</h1>
      </div>
      <div className="Mainmenu__box Mainmenu__box--logout" onClick={() => Dispatch(destroyUser())} />
      {Array(5)
        .fill(0)
        .map((_val, idx) => (
          <div key={`1${idx}1`} className="Mainmenu__box Mainmenu__box--b1" style={{ gridArea: `b1_${idx + 1}` }} />
        ))}
      {Array(8)
        .fill(0)
        .map((_val, idx) => (
          <div key={`2${idx}2`} className="Mainmenu__box Mainmenu__box--b2" style={{ gridArea: `b2_${idx + 1}` }} />
        ))}
    </main>
  );
}
