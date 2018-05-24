import React, { StatelessComponent, SyntheticEvent } from 'react';
import { Input, SemanticICONS } from 'semantic-ui-react';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';

interface PlaceSearchBox {
  onPlacesChanged: (ref: StandaloneSearchBox | null) => void;
  onChange: (event: SyntheticEvent<HTMLInputElement>) => void;
  value: string;
  icon: SemanticICONS;
  placeholder: string;
}

const PlaceSearchBox: StatelessComponent<PlaceSearchBox> = ({
  onPlacesChanged,
  onChange,
  value,
  placeholder,
  icon
}) => {
  let ref: StandaloneSearchBox | null = null;
  return (
    <StandaloneSearchBox
      onPlacesChanged={() => onPlacesChanged(ref)}
      ref={searchBoxRef => {
        ref = searchBoxRef;
      }}
    >
      <Input
        icon={icon}
        iconPosition="left"
        style={{ width: '85%' }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </StandaloneSearchBox>
  );
};
export default PlaceSearchBox;
