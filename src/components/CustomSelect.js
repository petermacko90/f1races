import React, { Component, Fragment } from 'react';

class CustomSelect extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      cursor: 0
    };
    this.timeoutId = null;
  }

  onBlur = () => {
    this.timeoutId = setTimeout(() => {
      this.setState({ isOpen: false });
    })
  }

  onFocus = () => {
    clearTimeout(this.timeoutId);
  }

  toggleIsOpen = () => {
    this.setState(state => {
      return { isOpen: !state.isOpen };
    });
  }

  handleClick = (optionId, cursor) => () => {
    this.props.onChange(optionId);
    this.setState({ cursor });
  }

  handleKeyPress = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      this.setState({ isOpen: true });
    } else if (e.key === 'Escape' && this.state.isOpen) {
      this.setState({ isOpen: false });
    } else if (e.key === 'Tab' && this.state.isOpen) {
      e.preventDefault();
      this.setState({ isOpen: false });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.state.cursor < this.props.options.length - 1) {
        this.setState(state => {
          return { cursor: state.cursor + 1 };
        }, () => {
          if (!this.state.isOpen) {
            this.props.onChange(this.props.options[this.state.cursor].id);
          }
        });
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.state.cursor > 0) {
        this.setState(state => {
          return { cursor: state.cursor - 1 };
        }, () => {
          if (!this.state.isOpen) {
            this.props.onChange(this.props.options[this.state.cursor].id);
          }
        });
      }
    } else if (e.key === 'Enter') {
      this.props.onChange(this.props.options[this.state.cursor].id);
      this.setState({ isOpen: false });
    }
  }

  render() {
    return (
      <Fragment>
        <div onClick={this.toggleIsOpen} className='p10 custom-select'
        tabIndex='0' onKeyDown={this.handleKeyPress} onBlur={this.onBlur}
        onFocus={this.onFocus}>
          {this.props.value}
          { this.state.isOpen &&
            <div className='options'>
              {
                this.props.options.map((option, i) => {
                  return (
                    <button onClick={this.handleClick(option.id, i)}
                    key={option.id}
                    className={this.state.cursor === i ? 'active' : ''}>
                      {option.text}
                    </button>
                  );
                })
              }
            </div>
          }
        </div>
      </Fragment>
    );
  }
}

export default CustomSelect;
