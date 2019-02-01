import React from 'react';
import { shallow } from 'enzyme';
import MovieContainer from './MovieContainer';

describe('MovieContainer', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <MovieContainer />
    );
  });

  describe('MovieContainer container', () => {
    it('should properly render the component elements', () => {
      expect(wrapper).toMatchSnapshot();
    });
  
    it.skip('getMoviesToDisplay should return all matching movies', () => {});
  
    it.skip('getMoviesToDisplay should return all matching favorite movies by their id', () => {});
  });

  describe('mapStateToProps', () => {});
  
});