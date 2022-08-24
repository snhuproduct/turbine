import { TestBed } from '@angular/core/testing';
import { mockColumnMetadata } from './table-sorting.mock';

import { TableSortingService } from './table-sorting.service';

describe('TableSortingService', () => {
  let tableSortingService: TableSortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    tableSortingService = TestBed.inject(TableSortingService);
  });

  it('should be created', () => {
    expect(tableSortingService).toBeTruthy();
  });

  it('should properly return the sortColumnDataKey and sortDirectionCoefficient', () => {
    const { sortDirectionCoefficient } =
      tableSortingService.getSortDirectionCoefficient(mockColumnMetadata);

    expect(sortDirectionCoefficient).toEqual(0);
  });
});
