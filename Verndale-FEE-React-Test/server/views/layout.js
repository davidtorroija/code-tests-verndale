'use strict';

import React, { Component, PropTypes } from 'react';

export default class Layout extends Component{
	render(){
		return (
			<html>
				<head>
					<title>{this.props.title}</title>
				</head>
				<body>
					{this.props.children}

					<script src='./dist/main-bundle.js'></script>
				</body>
			</html>
		);
	}
}

Layout.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired
};
