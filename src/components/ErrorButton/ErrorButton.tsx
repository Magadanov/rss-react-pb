import React from 'react';

class ErrorButton extends React.PureComponent<unknown, { hasError: boolean }> {
  state = {
    hasError: false,
  };
  throwError = () => {
    this.setState({
      hasError: true,
    });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('smth error');
    }
    return (
      <button type="button" onClick={this.throwError}>
        Error
      </button>
    );
  }
}

export default ErrorButton;
