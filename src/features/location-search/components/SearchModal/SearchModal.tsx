import React, { useState, useMemo, useCallback } from "react";
import ReactModal from "react-modal";
import { useIsFetching } from "react-query";
import { debounce } from "lodash";
import { Location } from "../../../../types/weather";
import { Button, Icon, Spinner } from "../../../../components";
import SearchList from "../SearchList";
import "./SearchModal.scss";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  onNewLocationSelected: (location: Location) => void;
  onNewLocationHoverStart: (location: Location) => void;
  onNewLocationHoverEnd: (location: Location) => void;
}

function SearchModal({
  isOpen = false,
  onRequestClose,
  onNewLocationSelected,
  onNewLocationHoverStart,
  onNewLocationHoverEnd,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const isFetchingCities = useIsFetching([{ scope: "cities" }]) > 0;

  function queryChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  const debouncedQueryChangeHandler = useMemo(
    () => debounce(queryChangeHandler, 250),
    [],
  );

  const handleRequestClose = useCallback(() => {
    setSearchQuery("");
    onRequestClose();
  }, [onRequestClose]);

  const handleSearchItemSelected = useCallback(
    (location: Location) => {
      handleRequestClose();
      onNewLocationSelected(location);
    },
    [handleRequestClose, onNewLocationSelected],
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
            placeholder="Search location"
            className="searchModal__input"
            onChange={debouncedQueryChangeHandler}
          />
          <Icon type="search" className="searchModal__inputIcon" />
        </div>
      </section>
      {isFetchingCities && <Spinner className="searchModal__spinner" />}
      <SearchList
        searchQuery={searchQuery}
        onItemSelected={handleSearchItemSelected}
        onItemHoverStart={onNewLocationHoverStart}
        onItemHoverEnd={onNewLocationHoverEnd}
        isFetching={isFetchingCities}
      />
    </ReactModal>
  );
}

export default SearchModal;
