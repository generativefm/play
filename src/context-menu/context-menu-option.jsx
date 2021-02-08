import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './context-menu-option.module.scss';
import useCreateContextMenu from './use-create-context-menu';

const ContextMenuOption = ({
  children,
  onClick,
  href,
  linkTo,
  isHighlighted = false,
}) => {
  const createContextMenu = useCreateContextMenu();
  const handleClick = useCallback(() => {
    if (typeof onClick === 'function') {
      onClick();
    }
    createContextMenu(null);
  }, [onClick, createContextMenu]);

  if (linkTo) {
    return (
      <Link
        className={classnames(styles['context-menu-option'], {
          [styles['context-menu-option--is-highlighted']]: isHighlighted,
        })}
        to={linkTo}
        onClick={handleClick}
      >
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        className={classnames(styles['context-menu-option'], {
          [styles['context-menu-option--is-highlighted']]: isHighlighted,
        })}
        href={href}
        onClick={handleClick}
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
      </a>
    );
  }

  return (
    <div
      className={classnames(styles['context-menu-option'], {
        [styles['context-menu-option--is-highlighted']]: isHighlighted,
      })}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

ContextMenuOption.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  href: PropTypes.string,
  linkTo: PropTypes.string,
  isHighlighted: PropTypes.bool,
};

export default ContextMenuOption;
