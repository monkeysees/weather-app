import React, { useState, useMemo } from "react";
import ReactModal from "react-modal";
import { debounce } from "lodash";
import { useUserDispatch } from "../../../../providers/UserProvider";
import { Location } from "../../../../types/weather";
import { Button, Icon } from "../../../../components";
import SearchList from "../SearchList";
import "./SearchModal.scss";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

function SearchModal({ isOpen = false, onRequestClose }: Props) {
  const userDispatch = useUserDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  function queryChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  const debouncedQueryChangeHandler = useMemo(
    () => debounce(queryChangeHandler, 250),
    [],
  );

  const handleRequestClose = useMemo(
    () => () => {
      setSearchQuery("");
      onRequestClose();
    },
    [onRequestClose],
  );

  const handleSearchItemSelected = useMemo(
    () => (location: Location) => {
      handleRequestClose();
      userDispatch({ type: "change-location", location });
    },
    [userDispatch, handleRequestClose],
  );

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
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
            onChange={debouncedQueryChangeHandler}
          />
          <Icon type="search" className="searchModal__inputIcon" />
        </div>
        <Button className="searchModal__inputBtn">Search</Button>
      </section>
      <SearchList
        searchQuery={searchQuery}
        onItemSelected={handleSearchItemSelected}
      />
    </ReactModal>
  );
}

export default SearchModal;
