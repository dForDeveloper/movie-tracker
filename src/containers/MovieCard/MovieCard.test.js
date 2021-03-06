import React from 'react';
import { shallow } from 'enzyme';
import { MovieCard, mapStateToProps, mapDispatchToProps }  from './MovieCard';
import { toggleLoginPrompt } from '../../actions';
import { toggleFavorite } from '../../thunks/toggleFavorite';

const toggleFavoriteMock = jest.fn();
const toggleLoginPromptMock = jest.fn();
const mockUser = { id: 1, name: 'shannon' };
const mockProps = { 
  title: 'frozen',
  poster_path: 'url/imgur',
  currentUser: mockUser,
  favorite: true,
  id: 123456,
  toggleFavorite: toggleFavoriteMock,
  toggleLoginPrompt: toggleLoginPromptMock
}

jest.mock('../../thunks/toggleFavorite.js')

describe('MovieCard', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <MovieCard {...mockProps}/>
    );
  });

  describe('MovieCard container', () => {
    it('should properly render the component elements', () => {
      expect(wrapper).toMatchSnapshot();
    });
  
    it('should call handleClick when a movie image is clicked', () => {
      wrapper.instance().handleClick = jest.fn();
      wrapper.update();
      wrapper.find('.moviecard-favorite').simulate('click');
      expect(wrapper.instance().handleClick).toBeCalled();
    });

    it('should call toggleFavorite when handleClick is called and there is a user', () => {
      wrapper.instance().handleClick(mockUser);
      expect(toggleFavoriteMock).toHaveBeenCalled();
    });
    
    it('should call toggleLoginPrompt when handleClick is called and there is not a user', () => {
      wrapper.instance().handleClick({});
      expect(toggleLoginPromptMock).toHaveBeenCalledWith(true);
    });
  });

  describe('mapStateToProps', () => {
    it(`should return an object with a currentUser object`, () => {
      const mockState = {
        movies: [{ id: 234567, title: 'A Star is Born' }],
        currentUser: { id: 1, name: 'Jeo' },
        favorites: [],
        showLoginPrompt: false
      }
      const expected = { currentUser: { id: 1, name: 'Jeo' } };
      const result = mapStateToProps(mockState);
      expect(result).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    let dispatchMock = jest.fn()
    const result = mapDispatchToProps(dispatchMock);

    it('should call dispatch when toggleLoginPrompt is called', () => {
      const expected = toggleLoginPrompt(false);
      result.toggleLoginPrompt(false);
      expect(dispatchMock).toHaveBeenCalledWith(expected);
    });

    it('should call dispatch when toggleFavorite is called', () => {
      const expected = toggleFavorite({ title: 'frozen' }, true);
      result.toggleFavorite({ title: 'frozen' }, true);
      expect(dispatchMock).toHaveBeenCalledWith(expected);
    });
  });
});