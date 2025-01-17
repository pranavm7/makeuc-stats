import React from 'react';

export function Navbar() {
  return <nav className="navbar navbar-expand-lg navbar-dark bg-primary-new fixed-top">
    <div className="container">
      <a className="navbar-brand" href="/">
        <img src="/logo.png" alt="MakeUC" className="mr-3"/>
        MakeUC Stats
      </a>
      <div>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="https://makeuc.io/">Main Website</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>;
}