import React from "react";
import ReactModal from "react-modal";
import { Button, Icon } from "../../../../components";
import SearchList from "../SearchList";
import "./SearchModal.scss";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

function SearchModal({ isOpen = false, onRequestClose }: Props) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldReturnFocusAfterClose={false}
      style={{
        overlay: { backgroundColor: "none", zIndex: 1, width: "33%" },
      }}
      className="searchModal"
    >
      <Button
        className="searchModal__closeBtn"
        onClick={onRequestClose}
        aria={{ "aria-label": "Close modal" }}
      >
        <Icon type="close" className="searchModal__closeIcon" />
      </Button>
      <section className="searchModal__inputSection">
        <div className="searchModal__inputField">
          <input
            aria-label="Search location"
            placeholder="Enter location"
            className="searchModal__input"
          />
          <Icon type="search" className="searchModal__inputIcon" />
        </div>
        <Button className="searchModal__inputBtn">Search</Button>
      </section>
      <SearchList />
    </ReactModal>
  );
}

export default SearchModal;
