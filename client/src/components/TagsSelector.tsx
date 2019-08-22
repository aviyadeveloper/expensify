import React from 'react';

interface ITagsSelecotorProps {
  tags: string[] | 0;
  availableTags: string[];
  populateTags: (tags: string[]) => void;
  suggestion: string;
}

interface ITagsSelectorState {
  tagInput: string;
  tagInputValid: boolean;
  activeTags: string[];
  suggestion: string;
}

export class TagsSelector extends React.Component<
  ITagsSelecotorProps,
  ITagsSelectorState
> {
  state: ITagsSelectorState = {
    tagInput: '',
    tagInputValid: false,
    activeTags: this.props.tags || [],
    suggestion: ''
  };

  handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagInput: string | false =
      e.currentTarget &&
      typeof e.currentTarget.value === 'string' &&
      e.currentTarget.value.toLowerCase();
    let suggestion: string | undefined;
    if (tagInput) {
      suggestion = this.props.availableTags.find(
        (tag: string): boolean => {
          return (
            tag.startsWith(tagInput) &&
            !(this.props.tags && this.props.tags.includes(tag))
          );
        }
      );
    }

    if (suggestion && tagInput && tagInput.length > 0) {
      this.setState({ suggestion });
    } else {
      this.setState({ suggestion: '' });
    }

    if (tagInput && this.validateTagInput(tagInput)) {
      this.setState({ tagInput, tagInputValid: true });
    } else if (tagInput) {
      this.setState({ tagInput, tagInputValid: false });
    }
  };

  addTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState(
      {
        activeTags: [...this.state.activeTags, this.state.tagInput],
        tagInput: '',
        tagInputValid: false,
        suggestion: ''
      },
      () => {
        this.props.populateTags(this.state.activeTags);
      }
    );
  };

  validateTagInput = (tag: string): boolean => {
    return typeof tag === 'string' && !this.state.activeTags.includes(tag);
  };

  deleteTag = (e: React.MouseEvent<HTMLButtonElement>, key: string) => {
    e.preventDefault();
    this.setState(
      {
        activeTags: this.state.activeTags.filter(tag => tag !== key)
      },
      () => {
        this.props.populateTags(this.state.activeTags);
      }
    );
  };

  render() {
    return (
      <div className="tags-selector">
        <div className="tags-selector__tags-adder">
          <input
            onChange={this.handleTagInputChange}
            className="tags-selector__tags-adder__input input-group__input"
            placeholder="Add tags"
            value={this.state.tagInput}
          />
          <span
            className="tags-selector__tags-added__input__suggestion"
            data-suggestion={this.state.suggestion}
          />
          <button
            className="tags-selector__tags-added__add-button"
            onClick={this.addTag}
            disabled={!this.state.tagInputValid}
          >
            add tag
          </button>
        </div>
        <div className="tags-selector__active-tags">
          {this.state.activeTags.map(tag => (
            <div className="tags-selector__active-tags__tag" key={tag}>
              <p key={tag} className="tags-selector__active-tags__tag__text">
                {tag}
              </p>
              <button
                className="tags-selector__active-tags__tag__delete-button"
                onClick={e => {
                  this.deleteTag(e, tag);
                }}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
