export class SearchTripDto {
    @IsString()
    @Length(3, 3)
    origin: string;
  
    @IsString()
    @Length(3, 3)
    destination: string;
  
    @IsIn(['cheapest', 'fastest'])
    sort_by: string;
  }