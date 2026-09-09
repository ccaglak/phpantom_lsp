window.BENCHMARK_DATA = {
  "lastUpdate": 1788922662048,
  "repoUrl": "https://github.com/ccaglak/phpantom_lsp",
  "entries": {
    "PHPantom Benchmarks": [
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "41be3555d129d62ed88b6f2c4315a76918bf094b",
          "message": "Container string aliases",
          "timestamp": "2026-07-13T04:00:13+02:00",
          "tree_id": "65b9e8c7d0e4f8570c1504efd61ef8fa0d4bc76d",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/41be3555d129d62ed88b6f2c4315a76918bf094b"
        },
        "date": 1783916995175,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.286,
            "range": "± 0.101",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.03,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.081,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.118,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.204,
            "range": "± 0.012",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.198,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 0.796,
            "range": "± 0.029",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 1.536,
            "range": "± 0.010",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.076,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.037,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.033,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.044,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 3.419,
            "range": "± 0.064",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.202,
            "range": "± 0.018",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.194,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.049,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.035,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.091,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.064,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.053,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.141,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 0.8,
            "range": "± 0.010",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 4.303,
            "range": "± 0.019",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 0.819,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.029,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.027,
            "range": "± 0.000",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 37.074,
            "range": "± 0.153",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 0.837,
            "range": "± 0.015",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "755d40bd232ce5acc711ee3a18934a8043e51fad",
          "message": "Assigning `null` to a property tracks",
          "timestamp": "2026-07-14T04:30:51+02:00",
          "tree_id": "149d87bf0ea3fa1179166d7ac1c3dbea5ad2ec49",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/755d40bd232ce5acc711ee3a18934a8043e51fad"
        },
        "date": 1784001148461,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 6.123,
            "range": "± 0.083",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.046,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.119,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.164,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.241,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.245,
            "range": "± 0.017",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 0.943,
            "range": "± 0.024",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 1.786,
            "range": "± 0.081",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.123,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.054,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.054,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.072,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 4.086,
            "range": "± 0.025",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.236,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.256,
            "range": "± 0.019",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.087,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.058,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.129,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.11,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.099,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.194,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.049,
            "range": "± 0.013",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 5.489,
            "range": "± 0.085",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.066,
            "range": "± 0.021",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.038,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.035,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 69.227,
            "range": "± 1.057",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 1.591,
            "range": "± 0.016",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cdwhite3@pm.me",
            "name": "Caleb White",
            "username": "calebdw"
          },
          "committer": {
            "email": "cdwhite3@pm.me",
            "name": "Caleb White",
            "username": "calebdw"
          },
          "distinct": true,
          "id": "ec64d3bada6bd175bb30a1fd0c065f52c653a22c",
          "message": "fix: infer configured date factory class",
          "timestamp": "2026-07-18T22:01:53-05:00",
          "tree_id": "acf32ef59d2a34bcce0c49793b9b6839c7a11829",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/ec64d3bada6bd175bb30a1fd0c065f52c653a22c"
        },
        "date": 1784432759679,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 5.51,
            "range": "± 0.158",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.039,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.089,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.127,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.199,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.195,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 0.783,
            "range": "± 0.022",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 1.561,
            "range": "± 0.057",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.088,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.046,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.041,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.051,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 2.741,
            "range": "± 0.073",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.225,
            "range": "± 0.046",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.2,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.057,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.048,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.11,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.072,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.063,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.126,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 0.741,
            "range": "± 0.024",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 4.092,
            "range": "± 0.066",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 0.748,
            "range": "± 0.015",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.025,
            "range": "± 0",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.024,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 50.648,
            "range": "± 2.471",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 1.156,
            "range": "± 0.089",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "e91c13a2cfcb7d1b6cfe1234fc1d1dce8c5fe2fd",
          "message": "`SymbolKind` stores owned strings per span",
          "timestamp": "2026-07-27T05:06:09+02:00",
          "tree_id": "9772db3ac245d8ccda1fcdd8eec4130decf5688a",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/e91c13a2cfcb7d1b6cfe1234fc1d1dce8c5fe2fd"
        },
        "date": 1785122878627,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 3.971,
            "range": "± 0.209",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.048,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.118,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.162,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.231,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.278,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.142,
            "range": "± 0.027",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.16,
            "range": "± 0.051",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.124,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.056,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.053,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.066,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 5.195,
            "range": "± 0.081",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.152,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.329,
            "range": "± 0.02",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.082,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.053,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.123,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.124,
            "range": "± 0.018",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.099,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.216,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.148,
            "range": "± 0.013",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 6.046,
            "range": "± 0.185",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.165,
            "range": "± 0.02",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.048,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.045,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 73.626,
            "range": "± 4.685",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 1.704,
            "range": "± 0.057",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "shuvro.nsu.cse@gmail.com",
            "name": "Shuvro Roy",
            "username": "shuvroroy"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "88ba719a9a297ad6bf0e392696b76d3919453428",
          "message": "Route parameter name completion",
          "timestamp": "2026-07-31T23:15:34+02:00",
          "tree_id": "72bf174c87ffbc1b14a072303908269823f91e51",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/88ba719a9a297ad6bf0e392696b76d3919453428"
        },
        "date": 1785551798306,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.881,
            "range": "± 0.673",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.05,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.121,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.164,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.248,
            "range": "± 0.011",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.295,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.183,
            "range": "± 0.024",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.262,
            "range": "± 0.093",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.137,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.061,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.066,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.074,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 5.427,
            "range": "± 0.042",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.157,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.366,
            "range": "± 0.023",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.08,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.052,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.143,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.122,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.093,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.214,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.117,
            "range": "± 0.021",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 6.487,
            "range": "± 0.379",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.12,
            "range": "± 0.012",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.037,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.035,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 56.212,
            "range": "± 0.542",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 1.745,
            "range": "± 0.048",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cdwhite3@pm.me",
            "name": "Caleb White",
            "username": "calebdw"
          },
          "committer": {
            "email": "cdwhite3@pm.me",
            "name": "Caleb White",
            "username": "calebdw"
          },
          "distinct": true,
          "id": "b9d0da90554862fe867d6e3b3ca00139f53856cf",
          "message": "docs: update nvim installation instructions\n\nCloses #310",
          "timestamp": "2026-08-01T19:01:44-05:00",
          "tree_id": "ef31ad51851e08623dbed919c501fe3669c0bd31",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/b9d0da90554862fe867d6e3b3ca00139f53856cf"
        },
        "date": 1785646794899,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.267,
            "range": "± 0.321",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.039,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.097,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.144,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.239,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.283,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.253,
            "range": "± 0.027",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.438,
            "range": "± 0.03",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.1,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.052,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.047,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.051,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 6.088,
            "range": "± 0.034",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.168,
            "range": "± 0.015",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.316,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.055,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.042,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.116,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.087,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.068,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.197,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.09,
            "range": "± 0.025",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 5.941,
            "range": "± 0.063",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.115,
            "range": "± 0.019",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.037,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.036,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 58.752,
            "range": "± 0.386",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 1.581,
            "range": "± 0.066",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "658dbb8230cbdcafbe813311b95968aa6797c582",
          "message": "A plain function body resolves class names against the file's namespace",
          "timestamp": "2026-08-06T02:50:01+02:00",
          "tree_id": "c4726fa7c48637f8ed8a3ea68ea07dfee92273f4",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/658dbb8230cbdcafbe813311b95968aa6797c582"
        },
        "date": 1785984545050,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.026,
            "range": "± 0.04",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.036,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.093,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.139,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.234,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.278,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.21,
            "range": "± 0.011",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.374,
            "range": "± 0.017",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.098,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.049,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.044,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.048,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 6.762,
            "range": "± 0.028",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.154,
            "range": "± 0.011",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.34,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.053,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.039,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.116,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.085,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.068,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.193,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.069,
            "range": "± 0.032",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 5.687,
            "range": "± 0.112",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.091,
            "range": "± 0.018",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.036,
            "range": "± 0",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.035,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 52.767,
            "range": "± 0.407",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 1.586,
            "range": "± 0.057",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "86201b0c9b71c75ec85abc22c692421fef375b38",
          "message": "A template's signature is held to the layouts it renders through",
          "timestamp": "2026-08-09T04:49:21+02:00",
          "tree_id": "48bc2e5d2089636a24fc94667c205c90dd54bf2e",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/86201b0c9b71c75ec85abc22c692421fef375b38"
        },
        "date": 1786244609463,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.18,
            "range": "± 0.061",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.039,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.094,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.141,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.237,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.285,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.24,
            "range": "± 0.026",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.444,
            "range": "± 0.019",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.104,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.051,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.046,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.051,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 6.438,
            "range": "± 0.028",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.156,
            "range": "± 0.018",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.34,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.056,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.041,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.117,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.09,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.072,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.196,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.092,
            "range": "± 0.02",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 5.866,
            "range": "± 0.718",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.095,
            "range": "± 0.023",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.037,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.036,
            "range": "± 0",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 54.789,
            "range": "± 0.488",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 1.647,
            "range": "± 0.061",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "a4f75f34ecaed5a14b9093ae6f9537a90087c385",
          "message": "A Blade partial learns its variables from the templates that render it",
          "timestamp": "2026-08-10T05:32:36+02:00",
          "tree_id": "b8d08c492e7cc4141685a4d31998add79c5f6cff",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/a4f75f34ecaed5a14b9093ae6f9537a90087c385"
        },
        "date": 1786334556962,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.09,
            "range": "± 0.064",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.045,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.101,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.152,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.232,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.28,
            "range": "± 0.011",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.177,
            "range": "± 0.029",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.263,
            "range": "± 0.017",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.125,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.061,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.055,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.064,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 5.543,
            "range": "± 0.03",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.153,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.363,
            "range": "± 0.022",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.075,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.048,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.123,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.112,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.083,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.216,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.107,
            "range": "± 0.014",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 5.643,
            "range": "± 0.073",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.105,
            "range": "± 0.016",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.036,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.034,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 53.741,
            "range": "± 0.739",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 1.811,
            "range": "± 0.045",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "4b71f79e36d768e45fa28388564f62cc9818ddc1",
          "message": "A closure that returns the wrong thing for a `callable(...)` parameter\nis reported",
          "timestamp": "2026-08-12T05:23:00+02:00",
          "tree_id": "503feadbc175ad4fe3489bc35891260327e1da1f",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/4b71f79e36d768e45fa28388564f62cc9818ddc1"
        },
        "date": 1786506179623,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.068,
            "range": "± 0.276",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.038,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.094,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.14,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.232,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.287,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.244,
            "range": "± 0.018",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.402,
            "range": "± 0.016",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.112,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.051,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.045,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.051,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 6.047,
            "range": "± 0.028",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.164,
            "range": "± 0.013",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.333,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.055,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.041,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.114,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.087,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.071,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.201,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.094,
            "range": "± 0.019",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 5.857,
            "range": "± 0.046",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.109,
            "range": "± 0.02",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.037,
            "range": "± 0",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.035,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 54.365,
            "range": "± 0.386",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 2.424,
            "range": "± 0.014",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "9f2441424f475743635d4a9a360fb995de799b46",
          "message": "A docblock that contradicts its own signature",
          "timestamp": "2026-08-13T04:17:51+02:00",
          "tree_id": "b68e336db3b7dd2b52ad52e86810396c3f1061c1",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/9f2441424f475743635d4a9a360fb995de799b46"
        },
        "date": 1786590162315,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.205,
            "range": "± 0.087",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.05,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.108,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.16,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.238,
            "range": "± 0.011",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.297,
            "range": "± 0.011",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.224,
            "range": "± 0.036",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.412,
            "range": "± 0.106",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.14,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.063,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.052,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.073,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 5.639,
            "range": "± 0.175",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.152,
            "range": "± 0.011",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.363,
            "range": "± 0.015",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.075,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.05,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.124,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.115,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.094,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.218,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.117,
            "range": "± 0.031",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 5.773,
            "range": "± 0.131",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.115,
            "range": "± 0.015",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.037,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.035,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 56.398,
            "range": "± 1.105",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 2.609,
            "range": "± 0.073",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "shuvro.nsu.cse@gmail.com",
            "name": "Shuvro Roy",
            "username": "shuvroroy"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d63bb5b2523fd981ccd83ec28a385e6287ba7bb8",
          "message": "Path helper links and completion",
          "timestamp": "2026-08-16T03:45:28+02:00",
          "tree_id": "99003784b424581386cb5111898fe445b52120e4",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/d63bb5b2523fd981ccd83ec28a385e6287ba7bb8"
        },
        "date": 1786845520854,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.818,
            "range": "± 0.309",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.046,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.114,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.157,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.24,
            "range": "± 0.011",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.286,
            "range": "± 0.013",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.223,
            "range": "± 0.036",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.35,
            "range": "± 0.078",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.148,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.061,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.053,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.074,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 5.449,
            "range": "± 0.188",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.149,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.365,
            "range": "± 0.021",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.075,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.054,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.122,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.119,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.103,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.22,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.134,
            "range": "± 0.013",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 6.057,
            "range": "± 0.287",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.141,
            "range": "± 0.038",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.037,
            "range": "± 0",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.036,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 67.344,
            "range": "± 0.764",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 2.745,
            "range": "± 0.026",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "ea941a807a828dd7a286a7ff1ff641a4bb323ef7",
          "message": "Hover stands down at every declaration site, not just most of them",
          "timestamp": "2026-08-17T03:40:20+02:00",
          "tree_id": "a36558e3e5df5fb30ca42e9cbc1609aae115a691",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/ea941a807a828dd7a286a7ff1ff641a4bb323ef7"
        },
        "date": 1786936062236,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.67,
            "range": "± 0.118",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.044,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.11,
            "range": "± 0.017",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.153,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.23,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.291,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.208,
            "range": "± 0.053",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.357,
            "range": "± 0.075",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.137,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.056,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.051,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.062,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 5.44,
            "range": "± 0.046",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.146,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.362,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.065,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.046,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.119,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.113,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.087,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.222,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.132,
            "range": "± 0.021",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 5.765,
            "range": "± 0.096",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.14,
            "range": "± 0.011",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.036,
            "range": "± 0",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.035,
            "range": "± 0",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 64.985,
            "range": "± 0.38",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 2.75,
            "range": "± 0.027",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "36e8f3519ddf5cbc3b7be88db15d97ab219b6989",
          "message": "A Laravel project that requires Larastan gets PHPStan diagnostics too",
          "timestamp": "2026-08-19T04:21:53+02:00",
          "tree_id": "b75e953733571d524c9a062667b30aecc894004b",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/36e8f3519ddf5cbc3b7be88db15d97ab219b6989"
        },
        "date": 1787107905300,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.347,
            "range": "± 0.343",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.038,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.097,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.142,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.238,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.286,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.235,
            "range": "± 0.055",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.373,
            "range": "± 0.015",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.12,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.05,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.045,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.053,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 6.458,
            "range": "± 0.132",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.162,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.333,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.055,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.04,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.116,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.097,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.075,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.203,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.108,
            "range": "± 0.015",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 5.889,
            "range": "± 0.03",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.117,
            "range": "± 0.016",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.036,
            "range": "± 0",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.035,
            "range": "± 0",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 162.321,
            "range": "± 1.006",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 2.498,
            "range": "± 0.012",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "533ef884630924b774a2d74ac3d6050f7b3fbce0",
          "message": "Bump version to 0.10.0",
          "timestamp": "2026-08-20T02:59:57+02:00",
          "tree_id": "b90ca259a1428baf1cf2ed8b0075c2568b0c65f4",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/533ef884630924b774a2d74ac3d6050f7b3fbce0"
        },
        "date": 1787193392531,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.312,
            "range": "± 0.189",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.049,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.109,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.168,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.253,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.286,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.185,
            "range": "± 0.039",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.332,
            "range": "± 0.06",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.15,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.059,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.053,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.065,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 5.56,
            "range": "± 0.31",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.166,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.359,
            "range": "± 0.024",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.08,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.053,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.122,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.121,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.1,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.222,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.124,
            "range": "± 0.033",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 5.845,
            "range": "± 0.218",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.131,
            "range": "± 0.022",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.036,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.035,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 163.049,
            "range": "± 4.332",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 2.932,
            "range": "± 0.027",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "d88a11a518b6fdf75c9b4035ad76e83bb438a917",
          "message": "Property narrowing next to a chained method call no longer goes\nexponential",
          "timestamp": "2026-08-22T17:57:14+02:00",
          "tree_id": "a9aeb253e4c67316239dc94b0f9364648c99cc36",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/d88a11a518b6fdf75c9b4035ad76e83bb438a917"
        },
        "date": 1787449542286,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 3.361,
            "range": "± 0.183",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.029,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.075,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.111,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.183,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.223,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 0.961,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 1.891,
            "range": "± 0.021",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.093,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.038,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.035,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.038,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 4.663,
            "range": "± 0.017",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.119,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.259,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.046,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.032,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.089,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.074,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.059,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.157,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 0.857,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 4.556,
            "range": "± 0.031",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 0.87,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.028,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.027,
            "range": "± 0",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 41.758,
            "range": "± 0.931",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 1.052,
            "range": "± 0.072",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "a622f4f5105ea02519b5c64c87fbad8ee0f88ad1",
          "message": "`array_merge()` describes everything it was handed, not just its first\nargument",
          "timestamp": "2026-08-25T22:41:22+02:00",
          "tree_id": "3070eba2284ed1283341d91e2cebe5634c98ea1d",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/a622f4f5105ea02519b5c64c87fbad8ee0f88ad1"
        },
        "date": 1787722248696,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.149,
            "range": "± 0.119",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.045,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.109,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.148,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.23,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.282,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.155,
            "range": "± 0.04",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.25,
            "range": "± 0.117",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.143,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.057,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.057,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.071,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 5.315,
            "range": "± 0.164",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.157,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.344,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.074,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.046,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.116,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.119,
            "range": "± 0.011",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.103,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.219,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.104,
            "range": "± 0.019",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 5.505,
            "range": "± 0.148",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.09,
            "range": "± 0.035",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.034,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.034,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 56.606,
            "range": "± 1.343",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 1.5,
            "range": "± 0.05",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "ce16c4c2c12fccfda845362db9b73e6052b18cb2",
          "message": "Fix a few type issues",
          "timestamp": "2026-08-26T23:39:11+02:00",
          "tree_id": "b7543c3188b9e6f10a3a29b2540754a3b5c72c89",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/ce16c4c2c12fccfda845362db9b73e6052b18cb2"
        },
        "date": 1787798477215,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.437,
            "range": "± 0.058",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.037,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.102,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.147,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.241,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.292,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.254,
            "range": "± 0.028",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.438,
            "range": "± 0.017",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.119,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.05,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.045,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.052,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 5.874,
            "range": "± 0.026",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.175,
            "range": "± 0.015",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.327,
            "range": "± 0.01",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.06,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.04,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.114,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.098,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.078,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.205,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.114,
            "range": "± 0.016",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 5.96,
            "range": "± 0.11",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.122,
            "range": "± 0.049",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.037,
            "range": "± 0",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.036,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 63.139,
            "range": "± 0.243",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 1.38,
            "range": "± 0.046",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "a8767c2269d0fdea461397b86dc58586d4ed3d3a",
          "message": "An assignment used as a value resolves to what it just wrote",
          "timestamp": "2026-08-30T00:20:08+02:00",
          "tree_id": "f591160e56c2140da1c68855eb71086375b20d01",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/a8767c2269d0fdea461397b86dc58586d4ed3d3a"
        },
        "date": 1788056767989,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.367,
            "range": "± 0.166",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.037,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.098,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.144,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.237,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.284,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.232,
            "range": "± 0.011",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.377,
            "range": "± 0.063",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.121,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.049,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.045,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.052,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 6.286,
            "range": "± 0.044",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.177,
            "range": "± 0.012",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.335,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.06,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.04,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.114,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.102,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.083,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.205,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.107,
            "range": "± 0.024",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 5.843,
            "range": "± 0.072",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.104,
            "range": "± 0.025",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.036,
            "range": "± 0",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.035,
            "range": "± 0",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 80.263,
            "range": "± 0.546",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 2.449,
            "range": "± 0.017",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cdwhite3@pm.me",
            "name": "Caleb White",
            "username": "calebdw"
          },
          "committer": {
            "email": "cdwhite3@pm.me",
            "name": "Caleb White",
            "username": "calebdw"
          },
          "distinct": true,
          "id": "0340c45c41d3757898f257e242b40e7e26d49fff",
          "message": "A class named inside a `@phpstan-type` or `@phpstan-import-type` is a reference to it\n\nBoth tags were already read for their types: the aliases they declare\nresolve, expand through inheritance chains, and drive completion. What\nwas missing is that the class names written inside them were never\nrecorded in the symbol map, because `emit_tag_symbols` had no arm for\n`TagValue::TypeAlias` or `TagValue::TypeAliasImport` and both fell\nthrough to the catch-all.\n\nThat span is what every name-level feature reads, so the omission went\nwell past colour. The tag name was highlighted (the generic `@word`\nscan catches it) and the whole rest of the line came back as one flat\ncomment run; go-to-definition on the class did nothing; it appeared in\nneither find-references nor document-highlight; and a class rename\nwalked past it, leaving the alias naming a class that no longer\nexists. The last of those is silent breakage, not a cosmetic gap.\n\nThe type behind a `@phpstan-type` now goes through `emit_type_symbols`\nlike any other docblock type, and the identifier after a\n`@phpstan-import-type`'s `from` through `emit_identifier_span`. The\n`@psalm-` and bare `@type` spellings parse to the same values and are\ncovered by a test rather than assumed.\n\nThe alias names themselves deliberately get no span: `UserRow` in\n`@phpstan-type UserRow …` and `Row` in `… as Row` are not classes, so\nclaiming them would resolve to nothing and feed the unknown-class\ndiagnostic. An alias referenced inside another alias is still not\nreported, since `unknown_classes` already skips names it finds in\n`type_aliases` — `analyze examples/php` reports the same 101\ndiagnostics before and after.",
          "timestamp": "2026-08-31T21:33:21-05:00",
          "tree_id": "02354459ec65a82d9dafc6fb163d3e672a0f6e6b",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/0340c45c41d3757898f257e242b40e7e26d49fff"
        },
        "date": 1788237234300,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.399,
            "range": "± 0.177",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.037,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.104,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.149,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.249,
            "range": "± 0.011",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.293,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.266,
            "range": "± 0.019",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.464,
            "range": "± 0.019",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.123,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.05,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.046,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.052,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 6.07,
            "range": "± 0.117",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.184,
            "range": "± 0.015",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.332,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.06,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.041,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.115,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.103,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.081,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.204,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.108,
            "range": "± 0.03",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 5.866,
            "range": "± 0.084",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.118,
            "range": "± 0.033",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.036,
            "range": "± 0",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.034,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 81.201,
            "range": "± 0.86",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 2.428,
            "range": "± 0.023",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "88db8ec3deec2958ad29482b87df07425c037a9f",
          "message": "Renames and moves reach Blade templates",
          "timestamp": "2026-09-05T03:51:21+02:00",
          "tree_id": "a52998de92429c1d2cc6e71c39c7b8b19da1ac54",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/88db8ec3deec2958ad29482b87df07425c037a9f"
        },
        "date": 1788581643753,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 3.583,
            "range": "± 0.16",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.029,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.074,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.114,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.186,
            "range": "± 0.011",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.222,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 0.942,
            "range": "± 0.011",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 1.833,
            "range": "± 0.024",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.092,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.039,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.035,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.039,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 4.56,
            "range": "± 0.019",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.14,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.255,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.048,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.032,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.088,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.078,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.064,
            "range": "± 0.003",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.157,
            "range": "± 0.002",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 0.864,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 4.571,
            "range": "± 0.066",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 0.873,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.029,
            "range": "± 0",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.028,
            "range": "± 0",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 63.154,
            "range": "± 0.433",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 1.9,
            "range": "± 0.077",
            "unit": "ms"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "committer": {
            "email": "anders@jenbo.dk",
            "name": "Anders Jenbo",
            "username": "AJenbo"
          },
          "distinct": true,
          "id": "33718a607552423c90ce2aaf21cca56ab2d518a2",
          "message": "Formatting from the command line",
          "timestamp": "2026-09-09T02:59:13+02:00",
          "tree_id": "dfff9f2425c132d6158b01affcfc69878ef8e7a6",
          "url": "https://github.com/ccaglak/phpantom_lsp/commit/33718a607552423c90ce2aaf21cca56ab2d518a2"
        },
        "date": 1788922661441,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cold_start_completion",
            "value": 4.885,
            "range": "± 0.303",
            "unit": "ms"
          },
          {
            "name": "completion_simple_class",
            "value": 0.045,
            "range": "± 0.004",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_5",
            "value": 0.109,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_10",
            "value": 0.164,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_inheritance_depth/depth_20",
            "value": 0.247,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/100_classes",
            "value": 0.299,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/500_classes",
            "value": 1.219,
            "range": "± 0.056",
            "unit": "ms"
          },
          {
            "name": "completion_classmap_size/1000_classes",
            "value": 2.355,
            "range": "± 0.089",
            "unit": "ms"
          },
          {
            "name": "completion_generics_and_mixins",
            "value": 0.157,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_with_narrowing",
            "value": 0.056,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_5_method_chain",
            "value": 0.056,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "completion_cross_file_type_hint",
            "value": 0.071,
            "range": "± 0.009",
            "unit": "ms"
          },
          {
            "name": "completion_carbon_class",
            "value": 5.438,
            "range": "± 0.049",
            "unit": "ms"
          },
          {
            "name": "completion_yii_deep_hierarchy",
            "value": 0.163,
            "range": "± 0.011",
            "unit": "ms"
          },
          {
            "name": "completion_large_file",
            "value": 0.36,
            "range": "± 0.035",
            "unit": "ms"
          },
          {
            "name": "completion_short_file",
            "value": 0.072,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "variable_completion/short",
            "value": 0.05,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "variable_completion/long",
            "value": 0.123,
            "range": "± 0.005",
            "unit": "ms"
          },
          {
            "name": "hover_method_call",
            "value": 0.133,
            "range": "± 0.007",
            "unit": "ms"
          },
          {
            "name": "goto_definition_method",
            "value": 0.108,
            "range": "± 0.008",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/100_lines",
            "value": 0.225,
            "range": "± 0.006",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/500_lines",
            "value": 1.139,
            "range": "± 0.021",
            "unit": "ms"
          },
          {
            "name": "update_ast_parse_time/2000_lines",
            "value": 6.27,
            "range": "± 0.381",
            "unit": "ms"
          },
          {
            "name": "reparse_500_line_file",
            "value": 1.154,
            "range": "± 0.034",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_generic_objects",
            "value": 0.035,
            "range": "± 0.001",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_new_objects",
            "value": 0.034,
            "range": "± 0",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/lots_of_missing_methods",
            "value": 82.173,
            "range": "± 1.587",
            "unit": "ms"
          },
          {
            "name": "diagnostics/fixture/method_chain",
            "value": 2.706,
            "range": "± 0.033",
            "unit": "ms"
          }
        ]
      }
    ]
  }
}