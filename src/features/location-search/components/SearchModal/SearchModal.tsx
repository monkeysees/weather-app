import React, { useState, useCallback } from "react";
import ReactModal from "react-modal";
import { useIsFetching } from "react-query";
import { debounce } from "lodash";
import { Location } from "../../../../types/weather";
import { AppearanceFade, Button, Icon, Spinner } from "../../../../components";
import SearchList from "../SearchList";
import styles from "./SearchModal.module.scss";

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

  const debouncedQueryChangeHandler = debounce(queryChangeHandler, 250);

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

  function focusSearchInputOnOpening(searchInput: HTMLInputElement) {
    searchInput.focus();
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      shouldReturnFocusAfterClose={false}
      contentLabel="Form for searching cities"
      className={styles.wrapper}
      overlayClassName={styles.overlay}
      bodyOpenClassName={styles.modal_open}
      contentRef={(node) => {
        if (!node) {
          return;
        }

        const searchInput = node.querySelector("input");
        if (searchInput) {
          focusSearchInputOnOpening(searchInput);
        }
      }}
    >
      <section
        className={styles.content}
        aria-live="polite"
        aria-busy={isFetchingCities ? "true" : "false"}
      >
        <Button
          className={styles.closeBtn}
          onClick={onRequestClose}
          aria={{ "aria-label": "Close cities search" }}
        >
          <Icon type="close" className={styles.closeIcon} />
        </Button>
        <section className={styles.inputSection}>
          <div className={styles.inputSection__field}>
            <input
              aria-label="Search location"
              placeholder="Search location"
              className={styles.inputSection__input}
              onChange={debouncedQueryChangeHandler}
            />
            <Icon type="search" className={styles.inputSection__icon} />
          </div>
        </section>
        {isFetchingCities && (
          <AppearanceFade started={isFetchingCities}>
            <Spinner className={styles.spinner} ariaLabel="Fetching cities…" />
          </AppearanceFade>
        )}
        <SearchList
          searchQuery={searchQuery}
          onItemSelected={handleSearchItemSelected}
          onItemHoverStart={onNewLocationHoverStart}
          onItemHoverEnd={onNewLocationHoverEnd}
          isFetching={isFetchingCities}
        />
      </section>
    </ReactModal>
  );
}

export default SearchModal;
